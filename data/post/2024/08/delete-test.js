// for node 6: 76300
// for node 7: 50855
const N0 = 50856

function fast() {
  const N = N0

  const o = {}
  for (let i = 0; i < N; i++) {
    o[i] = i
  }

  const t1 = Date.now()
  for (let i = 0; i < N; i++) {
    delete o[i]
  }
  const t2 = Date.now()

  console.log(N / (t2 - t1) + ' KOP/S')
}

function slow() {
  const N = N0 + 1 // adding just 1

  const o = {}
  for (let i = 0; i < N; i++) {
    o[i] = i
  }

  const t1 = Date.now()
  for (let i = 0; i < N; i++) {
    delete o[i]
  }
  const t2 = Date.now()

  console.log(N / (t2 - t1) + ' KOP/S')
}

fast()

slow()
