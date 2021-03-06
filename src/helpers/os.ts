import { cpuUsage } from 'os-utils'

export function getCpuUsage(): Promise<number>{
    return new Promise((resolve, reject) => {
        try{
            cpuUsage((cpu: number) => resolve(cpu));
        } catch (error) {
            reject(error);
        }
    })
}

export function memoryUsage(){
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100;
}