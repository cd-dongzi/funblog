import path from 'path'
import fs from 'fs'
import File from 'utils/file'

export default (schedule) => {
    const date = {hour: 0, minute: 0}
    const filePath = path.posix.join($publicPath, 'zip')
    schedule.scheduleJob(date, () => {
        File.deleteFolder(filePath)
    })
}