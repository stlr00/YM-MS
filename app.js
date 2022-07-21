setTimeout(setup, 1500)

function setup() {
    navigator.mediaSession.setActionHandler('play', () => externalAPI.togglePause(false))
    navigator.mediaSession.setActionHandler('pause', () => externalAPI.togglePause(true))
    navigator.mediaSession.setActionHandler('nexttrack', externalAPI.next)
    navigator.mediaSession.setActionHandler('previoustrack', externalAPI.prev)
    externalAPI.on(externalAPI.EVENT_TRACK, setMetaData)
    setMetaData()
}

function setMetaData() {
    try {
        const track = externalAPI.getCurrentTrack()
        const artist = track.artists.map(art => art.title).join(', ')

        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            album: track.album.title,
            artist: artist,
            artwork: [
                {src: 'https://' + track.cover.replace('%%', '30x30'), sizes: '30x30', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '50x50'), sizes: '50x50', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '80x80'), sizes: '80x80', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '100x100'), sizes: '100x100', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '200x200'), sizes: '200x200', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '300x300'), sizes: '300x300', type: 'image/png'},
                {src: 'https://' + track.cover.replace('%%', '400x400'), sizes: '400x400', type: 'image/png'},
            ],
        })
    } catch (e) {
        setTimeout(setMetaData, 300)
    }

}
