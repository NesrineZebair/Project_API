const { google } = require('googleapis')

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
    '916467629989-6hc52ogest65dsdm377mkjq4l98r4h4h.apps.googleusercontent.com',
    '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'
    )

oAuth2Client.setCredentials({
    refresh_token: '1//04AQ80d8SzmQaCgYIARAAGAQSNwF-L9IrLvGEY3RjDUXY-JhAL4JZBOHNaFE2GsNSyUt96DkhojGUtm5WtYOko4hxHGDOx5y52pw' 
})


const calendar = google.calendar({version : 'v3', auth: oAuth2Client})

const eventStartTime = new Date()

eventStartTime.setDate(eventStartTime.getDay() + 1)

const eventEndTime = new Date()

eventEndTime.setDate(eventEndTime.getDay()+1)
eventEndTime.setMinutes(eventEndTime.getMinutes()+45)

const event = {
    summary: `Meeting with Aicha`,
    location:`184 Rue de Rivoli, 75001 Paris`,
    description: `Meeting to talk about the news on the project`,
    colorId:1,
    start:{
        dateTime: eventStartTime,
        timeZone:`Europe/Paris`,
    },
    end: {
    dateTime:eventEndTime,
    timeZone:`Europe/Paris`,
},
}

calendar.freebusy.query({
    resource:{
        timeMin: eventStartTime,
        timeMax:eventEndTime,
        timeZone: `Europe/Paris`,
        items: [{id: 'primary'}],
    }
},
(err,res) => {
    if(err) return console.error('Free Busy Query Error: ', err)

    const eventArr = res.data.calendars.primary.busy

    if(eventArr.length === 0 ) return calendar.events.insert(
        { calendarId: 'primary', resource: event},
         err => {
            if (err) return console.error('Calendar Event Creation Error: ', err)

            return console.log('Calendar Event Created.')
         })
    
    return console.log(`Sorry I'm Busy`)

})