let DONE = false

function eventuallySetDoneState() {
  setTimeout(() => {
    DONE = true
  }, 400)  
}

function pollForDoneState(){
  const timeout = 600
  const intervalDelay = 100
  let elapsed = 0

  return new Promise((resolve,reject) => {
    const interval = setInterval(() => {
      elapsed += intervalDelay
      process.stdout.write('.')
      if (elapsed > timeout) {
        clearInterval(interval)
        reject(new Error('FAIL: timeout expired before reaching done state.'))
      } else if (DONE) {
        console.log('done')
        clearInterval(interval)
        resolve()
      }
    }, intervalDelay)
  })
}

console.log(`starting...are we done yet? ${DONE}`)
eventuallySetDoneState()
pollForDoneState().then(() => {
  console.log(`seems like we're done now, right? ${DONE}`)
}).catch((reason) => {
  console.error(reason.message)
})
