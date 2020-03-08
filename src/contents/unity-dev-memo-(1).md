---
author: asukachikaru
date: 2020-03-08
title: 'Unity dev memo (1)'
path: /post/unity-dev-memo-(1)
tags: Unity, Game Design
category: gaming
---

在數年的醞釀以及一時的心血來潮以後，我開始第一次真正投入時間學習 Unity 。至今一週，最大的感想是過往兩年自學程式的經驗惠我良多，但並不是因為程式的概念等，而是在尋找資源，搜尋關鍵字，看文件的速度上，比起兩三年前另一次摸 Unity 的時候有效率太多了。以下是這一週學到的我覺得值得筆記的部分。

## Object movement

在 Unity ，要讓一個物體移動有三種方式：

- `Transform.position`
- `Rigidbody.AddForce()`
- `CharacterController.Move()`

### Transform.position

`Transform` 是每個 gameObject 都有的屬性，掌管了物體的位置 (position)，角度 (rotation) 與大小 (scale) 。這三個屬性都具有 x, y, z 三個子屬性，對 position 你可以使用三維向量 (Vector3) ，對角度可以使用尤拉角 (Eular Angle) 來調整。

使用 `Transform.position` 調整物體位置的語法像是這樣：

    Transform.position = new Vector3(0, 0, 1);

在這裡，Vector3 裡面的數字都是整個遊戲地圖裡的絕對值，所以如果想基於物體位置進行移動，必須把物體當前位置也輸入進去。

    Vector3 objectPos = Transform.position;
    Transform.position = new Vector3(objetPos.x, objectPos.y, objectPos.z + 1);

這樣就能讓物體朝向 Z 方向移動 1 單位。

使用 `Transform.position` 是強制調整物體位置，有點像是瞬間移動。適合的場合有攝影機等。

### Rigidbody.Addforce

來看看官方說明手冊的對 Rigidbody 的第一句說明：

> Control of an object's position through physics simulation.

Rigidbody 是從物理面上控制物體。 `AddForce` 就是基於一個 Vector3 的角度給予外力。

    Rigidbody.AddForce(new Vector3(0, 0, 10));

這樣就會對該物體施加一股從 Z 方向來的大小為 10 的外力。

由於 Rigidbody 是模擬物理，所以外力大小，物體質量等等都會影響物體最終位移距離。如果外力夠大，物體就會跟落葉一樣被吹飛。適合的場合有破壞場景物件等等。

### CharacterController.Move

一樣來看看官方手冊的說明：

> A CharacterController allows you to easily do movement constrained by collisions without having to deal with a rigidbody.
A CharacterController is not affected by forces and will only move when you call the Move function. It will then carry out the movement but be constrained by collisions.

CharacterControll 是專為移動遊戲角色設計的，而不用使用外力或是瞬間移動的方式，能夠直接操控角色的移動。引數一樣是使用 Vector3 調整三個維度的移動幅度。

    CharacterController.Move(new Vector3(0, 0, 1));

`CharacterController.Move` 比起 `Rigidbody.AddForce` 更加平滑，且會受碰撞影響，比起 `Transform.position` 更加自然。

另外，值得注意的是有些動畫內建位移，若啟用 Root Motion 即使未使用任何移動函數仍然會移動物體，設計角色移動時必須將此一因素考慮進去。

## Execution Order

Unity 新增 script 的初始範本都包含兩個函數： `Start()` 與 `Update()` 。這兩個函數都是腳本系統的核心之一。

### Start()

Start 會在 script 啟動後，Update 的第一個 frame 更新前被呼叫。整個腳本生命中只會被呼叫這一次。

### Update()

Update 會在每一幀 (frame) 都被呼叫一次。玩家指令，角色移動等等都可以在這之中執行循環確認。但每一幀呼叫一次有一個問題，這代表 Update() 的呼叫頻率受客戶端的幀數影響，規格好幀數高呼叫次數就多，規格差呼叫次數就少，這將在玩家之間造成不平衡。

### FixedUpdate()

FixedUpdate 呼叫次數比 Update 高，且不綁定幀數，如果客戶端幀數低， FixedUpdate 可能在一幀之中呼叫數次，相反地若客戶端幀數高， FixedUpdate 也可能一幀呼叫不到一次。所有物理模擬與運算都會在 FixedUpdate 結束後立刻發生。

### LateUpdate()

LateUpdate() 會在 Update() 結束後被呼叫，所以也是一幀一次。LateUpdate() 被呼叫時， Update() 的運算已經全數完成。常見的使用場合是計算攝影機位置，能夠保證在角色完成移動後，攝影機才移動到需要的位置。

## Hitbox and hurtbox

3D 遊戲不可避免的就是 hitbox 與 hurtbox 的計算。這個功能可以使用 `Physics.OverlapBox()` 達成。這個函數的功用是指定一個中心點與三維距離所建構的立方體，尋找所有進入這個立方體的其他碰撞體 (Collider)。更甚還可以指定 Layer ，將判斷對象限定在特定 Layer 。

首先給想要賦予 Hitbox 的物體，比如說角色的拳頭，增加一個 Collider ，然後勾選 `Is Trigger` 。這個選項可以讓該 Collider 不會與其他 Collider 造成碰撞與物理位移，而只會偵測碰撞體之間的重疊並依此觸發事件。具體實作如下：

    public class AttackController : MonoBehaviour
    {
    		public Collider Hitbox;
    		public int ATK;
    		private List<GameObject> hitEnemies = new List<GameObject>();
    			
    		void Update()
    		{
            DetectAttack(Hitbox);
    		}
    		
    		public void ClearHitEnemyList()
    		{
    		    hitEnemies.Clear();
    		}
    
    		void DetectAttack(Collider hitbox)
    		{
    		    Collider[] hurtboxes = Physics.OverlapBox(
    		        hitbox.bounds.center, // 中心點
    		        hitbox.bounds.extents, // 三維尺寸
    		        hitbox.transform.rotation, // 三維角度
    		        LayerMask.GetMask("{INSERT LAYER NAME}") // 指定對象 layer
    		    );
    		    
    				// hurtboxed 就是這次攻擊所有被註冊的受攻擊碰撞體
    		    foreach (Collider hurtbox in hurtboxes)
    		    {
    		        GameObject enemy = hurtbox.gameObject;
    		        if (!hitEnemies.Contains(enemy))
    		        {
    		            hitEnemies.Add(enemy);
    		            enemy.doAnythingYouWant(...);
    		        }
    		    }
    		}
    }

我在這邊已經加入了對同一目標的重複判斷，因為 hitbox 與 hurtbox 在同一次攻擊內也可能重合複數次，使用一個 List 記錄目標並比對每次擊中的目標是否已在本次攻擊的目標列表裡。開始攻擊時呼叫 `ClearHitEnemyList` 清空列表即可。

最後的 `enemy` 是受到攻擊的 collider 的父物件本身，如果該物件在受到攻擊時呼叫的腳本在該物件身上，等於要從攻擊角色的 hitbox 腳本呼叫另一個物件的腳本，可以使用 `.SendMessageUpwards("{INSERT FUNC NAME}", {INSERT FUNC PARAM})` 。這個函數可以向上呼叫該腳本父物件的其他函數。