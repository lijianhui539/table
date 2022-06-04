/**
 * @file 输出日志函数
 */

const logWrapper = (location: string, msg: string, log: (location: string, msg: string) => void) => {
    // log(`[@component:Table/${location}]:`, msg)
}

const trace = (location: string, msg: string): void => logWrapper(location, msg, console.trace)
const warn = (location: string, msg: string): void => logWrapper(location, msg, console.warn)
const error = (location: string, msg: string): void => logWrapper(location, msg, console.error)

export const Logger = { trace, warn, error }
