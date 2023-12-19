var cars = document.querySelectorAll('.hp-car');
console.log(cars);
car1_pos = []

// let speed = 0;       // 初始速度
// let acceleration = 0.05;  // 加速度
// let deceleration = -0.1; // 减速度
// let xPos = 0;        // 初始位置
// let maxSpeed = 5;    // 最大速度

// function animate() {
//     // 更新位置
//     xPos += speed;
    
//     // 加速
//     if (speed < maxSpeed) {
//         speed += acceleration;
//     }

//     // 减速
//     if (xPos > 400 && speed > 0) {
//         speed += deceleration;
//     }

//     // 更新元素位置
//     cars[0].style.transform = `translateX(${xPos}px)`;
//     cars[1].style.transform = `translateX(${xPos-80}px)`;
//     cars[2].style.transform = `translateX(${xPos-160}px)`;

//     // 如果元素还在屏幕上，继续动画
//     if (xPos < 1000 && speed > 0) {
//         requestAnimationFrame(animate);
//     }
// }

// // 开始动画
// requestAnimationFrame(animate);

let position = 0;     // 当前位置
let velocity = 0;     // 当前速度
const acceleration = 40;  // 加速度
const deceleration = -50; // 减速度
let lastTime = 0;     // 上次动画帧的时间
let pauseStartTime = 0; // 暂停开始的时间
let isPaused = false;  // 是否暂停
const pauseDuration = 1000; // 暂停时长（毫秒）
let phase = 1;

function animate(time) {
    console.log(time);
    if (!lastTime) {
        lastTime = time;
        requestAnimationFrame(animate);
        return;
    }

    const deltaTime = (time - lastTime) / 1000; // 时间差（秒）
    lastTime = time;

    if (isPaused) {
        if (time - pauseStartTime > pauseDuration) {
            // 暂停结束
            console.log('stopstop');
            isPaused = false;
            phase = 3;
        } else {
            // 继续暂停
            requestAnimationFrame(animate);
            return;
        }
    }

    if (phase === 1) {
        // 第一阶段：加速直到达到20单位位置
        if (velocity < 100) {
            velocity += acceleration * deltaTime;
        }
        if (position >= 200) {
            phase = 2; // 进入第二阶段：暂停
            isPaused = true;
            pauseStartTime = time;
            velocity = 0;
        }
    } else if (phase === 3) {
        // 第三阶段：从20到40单位再次加速
        if (position < 400) {
            if (velocity < 100) {
                velocity += acceleration * deltaTime;
            }
        } else {
            // 接近40单位时减速
            velocity += deceleration * deltaTime;
            if (velocity <= 0) {
                velocity = 0;
                // 停止动画
                return;
            }
        }
    }

    position += velocity * deltaTime;

    // 更新元素的位置
    cars[0].style.transform = `translateX(${position}px)`; // 这里的单位可以根据需要调整

    requestAnimationFrame(animate);
}

// 开始动画
requestAnimationFrame(animate);



// def update_position_and_velocity(position, velocity, acceleration, safe_distance, front_car_position, front_car_velocity, speed_limit, reaction_time, max_acceleration, max_deceleration):
//     # 考慮反應時間
//     effective_velocity = velocity + acceleration * reaction_time

//     # 更新加速度：考慮最大加速度和減速度
//     if acceleration > 0:
//         acceleration = min(acceleration, max_acceleration)
//     else:
//         acceleration = max(acceleration, -max_deceleration)

//     # 更新速度：考慮限速和前車速度
//     new_velocity = min(effective_velocity, speed_limit, front_car_velocity)

//     # 計算新位置
//     new_position = position + new_velocity

//     # 檢查與前方車輛的安全距離
//     if front_car_position - new_position < safe_distance:
//         # 適應前方車輛的速度
//         new_velocity = min(new_velocity, front_car_velocity)
//         # 減速以維持安全距離
//         new_position = position + new_velocity

//     return new_position, new_velocity

// # 示範使用函數的方式
// # 假設車輛的初始位置為0，速度為10單位/秒，加速度為1單位/秒²，安全距離為5單位
// # 前車的位置為20單位，速度為8單位/秒，限速為15單位/秒，反應時間為1秒
// # 最大加速度為3單位/秒²，最大減速度為5單位/秒²
// position = 0
// velocity = 10
// acceleration = 1
// safe_distance = 5
// front_car_position = 20
// front_car_velocity = 8
// speed_limit = 15
// reaction_time = 1
// max_acceleration = 3
// max_deceleration = 5

// # 計算新的位置和速度
// new_position, new_velocity = update_position_and_velocity(position, velocity, acceleration, safe_distance, front_car_position, front_car_velocity, speed_limit, reaction_time, max_acceleration, max_deceleration)

// new_position, new_velocity

