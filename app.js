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
            artwork: makeAlbumSize(track.cover),
        })
    } catch (e) {
        setTimeout(setMetaData, 300)
    }

}

function makeAlbumSize(cover) {
    const sizes = [30, 50, 80, 100, 200, 300, 400]

    return sizes.map(size => ({
        src: 'https://' + cover.replace('%%', `${size}x${size}`),
        sizes: `${size}x${size}`,
        type: 'image/png'
    }))
}
