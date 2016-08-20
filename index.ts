import * as Promise from 'bluebird';


import * as child_process from 'child_process';


const exec = child_process.exec;


export default class SysService {

    constructor() {

    }


    status(service: string) {
        return new Promise<boolean>((resolve, reject) => {

        })
    }


    start(service: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            exec('systemctl start ' + service, (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr)
                }
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }

            })
        })
    }
    stop(service: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            exec('systemctl stop ' + service, (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr)
                }
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }

            })
        })
    }
    restart(service: string): Promise<boolean> {
        const _this = this
        return new Promise<boolean>((resolve, reject) => {
            _this.stop(service).then(() => {
                _this.start(service).then(() => {
                    resolve(true)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                _this.start(service).then(() => {
                    resolve(true)
                }).catch((err) => {
                    reject(err)
                })
            })
        })
    }


    enable(service: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            exec('systemctl enable ' + service, (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr)
                }
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }

            })
        })
    }

}