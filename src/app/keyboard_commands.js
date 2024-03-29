import { noop } from 'lodash'

// import USER_ROLES from '../data/user_roles'
import { DRAGGING_TYPE_RESIZE, DRAGGING_TYPE_MOVE } from '../segments/constants'
// import { handleSegmentMoveCancel } from '../segments/drag_and_drop'
import { handleSegmentResizeCancel } from '../segments/resizing'
import { formatMessage } from '../locales/locale'
import { showDialog } from '../store/slices/dialogs'
import { addToast } from '../store/slices/toasts'
import { handleUndo, handleRedo } from '../store/actions/undo'
import store from '../store'
import { registerKeypress } from './keypress'
import { ENV } from './config'

export function onGlobalKeyDown (event) {
  const { draggingType } = store.getState().ui

  switch (event.key) {
    case 'Esc': // IE/Edge specific value
    case 'Escape':
      if (draggingType === DRAGGING_TYPE_RESIZE) {
        handleSegmentResizeCancel()
      } else if (draggingType === DRAGGING_TYPE_MOVE) {
        // handleSegmentMoveCancel()
      } else {
        return
      }

      event.preventDefault()
      break
  }
}

export function registerKeypresses () {
  // In case anyone tries a save shortcut key out of reflex,
  // we inform the user that it's not necessary.
  registerKeypress('ctrl s', function () {
    store.dispatch(
      addToast({
        message: formatMessage(
          'toast.no-save',
          'No need to save by hand; Streetmix automatically saves your street!'
        )
      })
    )
  })

  // Catch-all for the Ctrl-S shortcut from ever trying to
  // save the page contents
  registerKeypress(
    'ctrl s',
    {
      preventDefault: true,
      requireFocusOnBody: false
    },
    noop
  )

  // Catch-all for the backspace or delete buttons to prevent
  // browsers from going back in history
  registerKeypress(
    ['backspace', 'delete'],
    {
      preventDefault: true,
      requireFocusOnBody: true
    },
    noop
  )

  // Secret menu to toggle feature flags
  // Only active in development/staging
  registerKeypress('shift f', () => {
    store.dispatch(showDialog('FEATURE_FLAGS'))
  })

  // Undo
  registerKeypress(
    'ctrl z',
    {
      preventDefault: true,
      requireFocusOnBody: true,
      shiftKey: false
    },
    () => {
      store.dispatch(handleUndo())
    }
  )

  // Redo
  registerKeypress(
    ['shift ctrl z', 'ctrl y'],
    {
      preventDefault: true,
      requireFocusOnBody: true
    },
    () => {
      store.dispatch(handleRedo())
    }
  )
}
