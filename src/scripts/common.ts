type FollowType = 'followers' | 'following'

interface TwitterAPIUser {
  id_str: string,
  screen_name: string,
  name: string,
  blocked_by: boolean,
  blocking: boolean,
  muting: boolean,
  friends_count: number,
  followers_count: number,
  description: string
}

interface EventStore {
  [eventName: string]: Function[]
}

class EventEmitter {
  protected events: EventStore = {}
  on<T> (eventName: string, handler: (t: T) => any) {
    if (!(eventName in this.events)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(handler)
    return this
  }
  emit<T> (eventName: string, eventHandlerParameter?: T) {
    const handlers = this.events[eventName] || []
    // console.info('EventEmitter: emit "%s" with %o', eventName, eventHandlerParameter)
    handlers.forEach(handler => handler(eventHandlerParameter))
    return this
  }
}

function sleep (time: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, time))
}

function validFollowType (str: string): FollowType {
  if (str === 'following' || str === 'followers') {
    return str
  } else if (str === 'followings') {
    console.warn('WARN: use "following" instead of "followingS"')
    return 'following'
  } else {
    throw new Error(`invalid followType: ${str}`)
  }
}

// 내가 차단한 사용자의 프로필에 "차단됨" 표시
function changeButtonToBlocked (profile: Element) { // eslint-disable-line no-unused-vars
  const actions = profile.querySelector('.user-actions')
  if (actions) {
    actions.classList.remove('not-following')
    actions.classList.add('blocked')
  }
}