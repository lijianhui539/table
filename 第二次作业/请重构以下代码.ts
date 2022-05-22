// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp(file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp(file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp(file: string): boolean {
    return true
}

// 实现如下
function upload(files: string[]): Promise<boolean> {
    return Promise.all(files.filter(file => {
        const ext = file.match(/\.(\w+)$/)[1]
        if (ext !== 'txt' && ext !== 'ext' && ext !== 'doc') {
            return false
        }
        return true
    }).map(file => {
        const ext = file.match(/\.(\w+)$/)[1]
        if (ext === 'txt') {
            return uploadByFtp(file)
        } else if (ext === 'exe') {
            return new Promise((resolve, reject) => {
                uploadBySftp([file], ret => {
                    if (ret) {
                        resolve(true)
                    } else {
                        reject()
                    }
                })
            })
        } else if (ext === 'doc') {
            return Promise.resolve(uploadByHttp(file))
        }
    })).then(() => {
        console.log('upload success.')
        return true
    })
}

/** -------------------------------------------------------------------------------------------------------------------- */

// 上传函数类型
type UploadMap = {
    [props: string]: (file: string) => Promise<boolean>
}

// 单个文件上传函数
type FilePro = {
    file: string,
    fileUploadFn: (file: string) => Promise<boolean>
}

function getExt(file: string) {
    return file.match(/\.(\w+)$/)[1]
}

function newUploadBySftp(file: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        uploadBySftp([file], ret => {
            if (ret) {
                resolve(true)
            } else {
                reject()
            }
        })
    })
}

function newUploadByHttp(file: string): Promise<boolean> {
    return Promise.resolve(uploadByHttp(file))
}

// 文件上传map
let uploadMap: UploadMap = {
    ftp: uploadByFtp,
    exe: newUploadBySftp,
    doc: newUploadByHttp
}

// 获取所有可以上传的文件类型
let fileType: string[] = Object.keys(uploadMap)

// 新的上传文件函数
function newUpload(files: string[], uploadMap: UploadMap) {

    // 获取可以上传的文件
    let validFile = files.filter(file => {
        const ext = getExt(file)
        return fileType.includes(ext)
    })

    // 上传函数list
    let fileUploadList: FilePro[] = []
    validFile.forEach(item => {
        const ext = getExt(item)
        let fileUploadFn = uploadMap[ext]
        let filePro = {
            file: item,
            fileUploadFn
        }
        fileUploadList.push(filePro)
    })

    // 循环调用上传函数
    let allPro = fileUploadList.map(item => item.fileUploadFn(item.file))
    return new Promise((resolve, reject) => {
        Promise.all(allPro).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}