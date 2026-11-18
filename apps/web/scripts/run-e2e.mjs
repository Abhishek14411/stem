import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

const host = '127.0.0.1'
const port = 4173
const baseUrl = `http://${host}:${port}`
const server = spawn(process.execPath, [
  './node_modules/vite/bin/vite.js',
  'preview',
  '--host',
  host,
], { stdio: 'inherit' })

let serverError
server.once('error', (error) => { serverError = error })

async function waitForServer() {
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (serverError) throw serverError
    if (server.exitCode !== null) throw new Error(`Vite preview exited with code ${server.exitCode}`)
    try {
      await fetch(baseUrl)
      return
    } catch {
      await delay(100)
    }
  }
  throw new Error(`Vite preview did not become available at ${baseUrl}`)
}

async function runPlaywright() {
  const runner = spawn(process.execPath, ['./node_modules/@playwright/test/cli.js', 'test'], { stdio: 'inherit' })
  return await new Promise((resolve, reject) => {
    runner.once('error', reject)
    runner.once('close', (code, signal) => {
      if (signal) reject(new Error(`Playwright exited after ${signal}`))
      else resolve(code ?? 1)
    })
  })
}

try {
  await waitForServer()
  process.exitCode = await runPlaywright()
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  if (server.exitCode === null) {
    server.kill()
    await new Promise((resolve) => server.once('close', resolve))
  }
}
