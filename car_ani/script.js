const main = document.querySelector('main');

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandNorm(mean, standardDeviation, min, max) {
    let num, u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = mean + z * standardDeviation;

    while (num < min || num > max) {
        console.log('here', num);
        num = getRandNorm(mean, standardDeviation, min, max);
    };

    return num;
}

const vehiclewidths = [40, 53, 73, 102];
var vehicleInfos = [];
var vehiclePosition = 0;

for (let i = 0; i < 10; i++) {
    let vehicleType = getRandInt(0, 3);
    let safeDistance = getRandNorm(40, 20, 5);
    vehicleInfos.push({
        type: vehicleType,
        position: vehiclePosition,
        velocity: getRandNorm(100, 20, 0),
        maxVelocity: getRandNorm(100, 20, 0),
        acceleration: getRandNorm(40, 10, 0, 80),
        deceleration: getRandNorm(-50, 10, -80, 0),
        safeDistance: safeDistance
    });
    appendVehicle(vehicleType, vehiclePosition);
    vehiclePosition -= vehiclewidths[vehicleType] + safeDistance;
}

function appendVehicle(type, position) {
    let svgVehicle = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svgVehicle.setAttribute('class', 'vehicles');

    if (type === 0) {
        svgVehicle.setAttribute('viewBox', '0 0 40 30');
        svgVehicle.setAttribute('width', '40');
        svgVehicle.innerHTML = `
                <rect class="fill-m-3" x="1.65" y="13.24" width="18.84" height="11.82" transform="translate(22.14 38.31) rotate(180)"/>
                <path class="fill-m" d="M.17,26.54H21.96V11.77H.17v14.77Zm18.84-2.95H3.13V14.72h15.88v8.86Z"/>
                <polygon class="fill-m-3" points="28.93 25.06 36 25.06 29.77 2.16 22.7 2.16 28.93 25.06"/>
                <path class="fill-m" d="M27.8,26.54h10.13L30.9,.68h-10.13l7.03,25.86Zm6.27-2.95h-4.01L24.64,3.64h4.01l5.42,19.95Z"/>
                <rect class="fill-m" x="18.64" y="23.59" width="18.47" height="2.95"/>
                <circle class="fill-m-bg" cx="11.07" cy="24.69" r="3.83"/>
                <path class="fill-m" d="M11.07,30c2.93,0,5.31-2.38,5.31-5.31s-2.38-5.31-5.31-5.31-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31Zm0-7.66c1.3,0,2.35,1.05,2.35,2.35s-1.05,2.35-2.35,2.35-2.35-1.05-2.35-2.35,1.05-2.35,2.35-2.35Z"/>
                <circle class="fill-m-bg" cx="34.52" cy="24.69" r="3.83"/>
                <path class="fill-m" d="M34.52,30c2.93,0,5.31-2.38,5.31-5.31s-2.38-5.31-5.31-5.31-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31Zm0-7.66c1.3,0,2.35,1.05,2.35,2.35s-1.05,2.35-2.35,2.35-2.35-1.05-2.35-2.35,1.05-2.35,2.35-2.35Z"/>
            `;
    } else if (type === 1) {
        svgVehicle.setAttribute('viewBox', '0 0 53 31');
        svgVehicle.setAttribute('width', '53');
        svgVehicle.innerHTML = `
                <path class="fill-m-3" d="M7.48,2.05h25.77l17.82,9.39v14.41H1.94V11.44L7.48,2.05Z"/>
                <path class="fill-m" d="M52.54,27.33H.46V11.04L6.63,.58h26.97l18.93,9.98V27.33ZM3.41,24.37H49.59V12.34L32.88,3.53H8.32L3.41,11.85v12.53Z"/>
                <circle class="fill-m-bg" cx="11.15" cy="25.69" r="3.83"/>
                <path class="fill-m" d="M11.15,31c-2.93,0-5.31-2.38-5.31-5.31s2.38-5.31,5.31-5.31,5.31,2.38,5.31,5.31-2.38,5.31-5.31,5.31Zm0-7.66c-1.3,0-2.35,1.05-2.35,2.35s1.05,2.35,2.35,2.35,2.35-1.05,2.35-2.35-1.05-2.35-2.35-2.35Z"/>
                <circle class="fill-m-bg" cx="36.66" cy="25.69" r="3.83"/>
                <path class="fill-m" d="M36.66,31c-2.93,0-5.31-2.38-5.31-5.31s2.38-5.31,5.31-5.31,5.31,2.38,5.31,5.31-2.38,5.31-5.31,5.31Zm0-7.66c-1.3,0-2.35,1.05-2.35,2.35s1.05,2.35,2.35,2.35,2.35-1.05,2.35-2.35-1.05-2.35-2.35-2.35Z"/>
            `;
    } else if (type === 2) {
        svgVehicle.setAttribute('viewBox', '0 0 73 47');
        svgVehicle.setAttribute('width', '73');
        svgVehicle.innerHTML = `
                <rect class="fill-m-3" x="1.78" y="2.17" width="51.02" height="39.68"/>
                <path class="fill-m" d="M.3,43.33H54.28V.69H.3V43.33Zm51.02-2.95H3.26V3.65H51.32V40.37Z"/>
                <path class="fill-m-3" d="M71.22,41.85h-18.42V18.05h12.88l5.54,9.39v14.41Z"/>
                <path class="fill-m" d="M51.32,43.33h21.38V27.04l-6.17-10.47h-15.2v26.75Zm18.42-2.95h-15.47V19.53h10.56l4.91,8.32v12.53Z"/>
                <circle class="fill-m-bg" cx="14.34" cy="41.69" r="3.83"/>
                <path class="fill-m" d="M14.34,47c2.93,0,5.31-2.38,5.31-5.31s-2.38-5.31-5.31-5.31-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31Zm0-7.66c1.3,0,2.35,1.05,2.35,2.35s-1.05,2.35-2.35,2.35-2.35-1.05-2.35-2.35,1.05-2.35,2.35-2.35Z"/>
                <circle class="fill-m-bg" cx="62.01" cy="41.69" r="3.83"/>
                <path class="fill-m" d="M62.01,47c2.93,0,5.31-2.38,5.31-5.31s-2.38-5.31-5.31-5.31-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31Zm0-7.66c1.3,0,2.35,1.05,2.35,2.35s-1.05,2.35-2.35,2.35-2.35-1.05-2.35-2.35,1.05-2.35,2.35-2.35Z"/>
            `;
    } else if (type === 3) {
        svgVehicle.setAttribute('viewBox', '0 0 102 38');
        svgVehicle.setAttribute('width', '102');
        svgVehicle.innerHTML = `
                <polygon class="fill-m-3" points="1.5 32.85 100.5 32.85 100.5 15.99 92 1.67 1.5 1.67 1.5 32.85"/>
                <path class="fill-m" d="M101.97,34.33H.03V.19H92.84l9.13,15.4v18.74ZM2.98,31.37H99.02v-14.98l-7.86-13.25H2.98V31.37Z"/>
                <circle class="fill-m-bg" cx="88.31" cy="32.69" r="3.83"/>
                <path class="fill-m" d="M88.31,38c-2.93,0-5.31-2.38-5.31-5.31s2.38-5.31,5.31-5.31,5.31,2.38,5.31,5.31-2.38,5.31-5.31,5.31Zm0-7.66c-1.3,0-2.35,1.05-2.35,2.35s1.05,2.35,2.35,2.35,2.35-1.05,2.35-2.35-1.05-2.35-2.35-2.35Z"/>
                <circle class="fill-m-bg" cx="13.69" cy="32.69" r="3.83"/>
                <path class="fill-m" d="M13.69,38c-2.93,0-5.31-2.38-5.31-5.31s2.38-5.31,5.31-5.31,5.31,2.38,5.31,5.31-2.38,5.31-5.31,5.31Zm0-7.66c-1.3,0-2.35,1.05-2.35,2.35s1.05,2.35,2.35,2.35,2.35-1.05,2.35-2.35-1.05-2.35-2.35-2.35Z"/>
            `;
    }

    svgVehicle.style.transform = `translateX(${position}px)`;
    main.appendChild(svgVehicle);
}

let lastTime = 0; 

function vehicleAnimate(time) {
    if (!lastTime) {
        lastTime = time;
        requestAnimationFrame(vehicleAnimate);
        return;
    }

    const deltaTime = (time - lastTime) / 1000; // 时间差（秒）
    lastTime = time;


    for (let i = 0; i < vehicleInfos.length; i++) {
        let vehicle = document.querySelectorAll('.vehicles')[i];

        vehicleInfos[i].velocity += vehicleInfos[i].acceleration * deltaTime;
        vehicleInfos[i].position += vehicleInfos[i].velocity * deltaTime;

        vehicle.style.transform = `translateX(${vehicleInfos[i].position}px)`;

    }
    requestAnimationFrame(vehicleAnimate);
}
// requestAnimationFrame(vehicleAnimate);



function vehicleAnimate(time) {
    if (!lastTime) {
        lastTime = time;
        requestAnimationFrame(vehicleAnimate);
        return;
    }

    const deltaTime = (time - lastTime) / 1000; // 时间差（秒）
    lastTime = time;

    for (let i = 0; i < vehicleInfos.length; i++) {
        let vehicle = document.querySelectorAll('.vehicles')[i];

        // 計算與前車的距離
        let distanceToFrontCar = i === 0 ? Infinity : vehicleInfos[i - 1].position - vehicleInfos[i].position;

        // 根據與前車的距離調整加速度
        if (distanceToFrontCar < vehicleInfos[i].safeDistance) {
            // 與前車距離小於安全距離，減速
            vehicleInfos[i].acceleration = -vehicleInfos[i].decelerationRate; // 設置為負加速度
        } else {
            // 與前車距離大於安全距離，可根據需要加速
            vehicleInfos[i].acceleration = vehicleInfos[i].normalAcceleration; // 正常加速度
        }

        // 更新速度和位置
        vehicleInfos[i].velocity += vehicleInfos[i].acceleration * deltaTime;
        vehicleInfos[i].velocity = Math.max(0, vehicleInfos[i].velocity); // 確保速度不小於0
        vehicleInfos[i].position += vehicleInfos[i].velocity * deltaTime;

        vehicle.style.transform = `translateX(${vehicleInfos[i].position}px)`;
    }
    requestAnimationFrame(vehicleAnimate);
}








// let position = 0;     // 当前位置
// let velocity = 0;     // 当前速度
// const acceleration = 40;  // 加速度
// const deceleration = -50; // 减速度
// let lastTime = 0;     // 上次动画帧的时间
// let pauseStartTime = 0; // 暂停开始的时间
// let isPaused = false;  // 是否暂停
// const pauseDuration = 1000; // 暂停时长（毫秒）
// let phase = 1;

// function animate(time) {
//     // console.log(time);
//     if (!lastTime) {
//         lastTime = time;
//         requestAnimationFrame(animate);
//         return;
//     }

//     const deltaTime = (time - lastTime) / 1000; // 时间差（秒）
//     lastTime = time;

//     if (isPaused) {
//         if (time - pauseStartTime > pauseDuration) {
//             // 暂停结束
//             console.log('stopstop');
//             isPaused = false;
//             phase = 3;
//         } else {
//             // 继续暂停
//             requestAnimationFrame(animate);
//             return;
//         }
//     }

//     if (phase === 1) {
//         // 第一阶段：加速直到达到20单位位置
//         if (velocity < 100) {
//             velocity += acceleration * deltaTime;
//         }
//         if (position >= 200) {
//             phase = 2; // 进入第二阶段：暂停
//             isPaused = true;
//             pauseStartTime = time;
//             velocity = 0;
//         }
//     } else if (phase === 3) {
//         // 第三阶段：从20到40单位再次加速
//         if (position < 400) {
//             if (velocity < 100) {
//                 velocity += acceleration * deltaTime;
//             }
//         } else {
//             // 接近40单位时减速
//             velocity += deceleration * deltaTime;
//             if (velocity <= 0) {
//                 velocity = 0;
//                 // 停止动画
//                 return;
//             }
//         }
//     }

//     position += velocity * deltaTime;

//     // 更新元素的位置
//     cars[0].style.transform = `translateX(${position}px)`; // 这里的单位可以根据需要调整

//     requestAnimationFrame(animate);
// }

// // 开始动画
// requestAnimationFrame(animate);



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

