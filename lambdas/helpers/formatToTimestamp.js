// Taken from https://github.com/jeremydaly/data-api-client/pull/44/files

// Formats the (UTC) date to the AWS accepted YYYY-MM-DD HH:MM:SS[.FFF] format
// See https://docs.aws.amazon.com/rdsdataservice/latest/APIReference/API_SqlParameter.html
const formatToTimeStamp = (date, treatAsLocalDate) => {
    const pad = (val, num = 2) => '0'.repeat(num - (val + '').length) + val

    const year = treatAsLocalDate ? date.getFullYear() : date.getUTCFullYear()
    const month = (treatAsLocalDate ? date.getMonth() : date.getUTCMonth()) + 1 // Convert to human month
    const day = treatAsLocalDate ? date.getDate() : date.getUTCDate()

    const hours = treatAsLocalDate ? date.getHours() : date.getUTCHours()
    const minutes = treatAsLocalDate ? date.getMinutes() : date.getUTCMinutes()
    const seconds = treatAsLocalDate ? date.getSeconds() : date.getUTCSeconds()
    const ms = treatAsLocalDate ? date.getMilliseconds() : date.getUTCMilliseconds()

    const fraction = ms <= 0 ? '' : `.${pad(ms, 3)}`

    return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}${fraction}`
}

module.exports = formatToTimeStamp;
