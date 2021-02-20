
'use strict'

async function register ({ registerHook, registerVideoField, peertubeHelpers }) {
  registerHook({
    target: 'action:router.navigation-end',
    handler: () => {
      const el = document.querySelector('.peertube-plugin-livechat-init')
      if (el) {
        el.classList.remove('peertube-plugin-livechat-init')
      }

      document.querySelectorAll('.peertube-plugin-livechat-stuff')
        .forEach(dom => dom.remove())
    }
  })

  const settings = await peertubeHelpers.getSettings()
  if (settings['chat-activate-on-video']) {
    const label = await peertubeHelpers.translate('Display a chat')
    registerVideoField(
      {
        name: 'livechat',
        label: label,
        type: 'input-checkbox',
        default: false
      },
      { type: 'update' }
    )
  }
}

export {
  register
}
