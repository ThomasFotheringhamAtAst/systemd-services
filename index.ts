import * as Promise from 'bluebird';


import * as child_process from 'child_process';


const exec = child_process.exec;



interface IStatus {
    active: boolean;
    active_status: string;
}


export default class SysService {

    constructor() {

    }


    status(service: string): Promise<IStatus> {
        return new Promise<IStatus>((resolve, reject) => {
            exec('systemctl status ' + service, (err, stdout, stderr) => {
                if (stderr) {
                    //   console.error(stderr)
                }
                if (!stdout) {
                    reject(err)
                } else {

                    let outperline = stdout.split('\n')

                    const status = <IStatus>{
                        active: false
                    }

                    for (let i = 0; i < outperline.length; i++) {
                        let line = outperline[i];

                        if (line.split('Active:').length > 1) {
                            status.active_status = line.split('Active: ')[1];
                            if (status.active_status.split(' ')[0] === 'active') {
                                status.active = true;
                            }
                        }

                    }
                    resolve(status)
                }

            })
        })
    }


    isActive(service: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            exec('systemctl is-active ' + service, (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr)
                }


                if (stdout.split('\n')[0] === 'active') {
                    resolve(true)

                } else {
                    resolve(false)

                }

            })
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