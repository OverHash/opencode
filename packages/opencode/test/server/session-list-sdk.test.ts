import { afterEach, describe, expect, test } from "bun:test"
import { mkdir } from "fs/promises"
import { createOpencodeClient as v1 } from "@opencode-ai/sdk"
import { createOpencodeClient as v2 } from "@opencode-ai/sdk/v2"
import { Server } from "../../src/server/server"
import { disposeAllInstances, tmpdir } from "../fixture/fixture"
import { resetDatabase } from "../fixture/db"
import * as Log from "@opencode-ai/core/util/log"

void Log.init({ print: false })

afterEach(async () => {
  await disposeAllInstances()
  await resetDatabase()
})

describe("session.list with sdk directory", () => {
  test("v2 does not implicitly filter by current directory", async () => {
    await using tmp = await tmpdir({ git: true })
    const dir = `${tmp.path}/.dmux/worktrees/a`
    await mkdir(dir, { recursive: true })

    const key = `worktree-v2-${Date.now()}`
    const app = Server.Default().app
    const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const req = new Request(input, init)
      return app.request(req)
    }) as typeof globalThis.fetch
    const rootSdk = v2({
      baseUrl: "http://opencode.internal",
      directory: tmp.path,
      fetch: fetcher,
    })
    const childSdk = v2({
      baseUrl: "http://opencode.internal",
      directory: dir,
      fetch: fetcher,
    })

    const root = await rootSdk.session.create({ title: `${key}-root` })
    const child = await childSdk.session.create({ title: `${key}-child` })
    const res = await childSdk.session.list({ search: key })
    const ids = (res.data ?? []).map((item) => item.id)

    expect(root.data?.id).toBeDefined()
    expect(child.data?.id).toBeDefined()
    if (!root.data?.id || !child.data?.id) throw new Error("session create did not return ids")
    expect(ids).toContain(root.data.id)
    expect(ids).toContain(child.data.id)
  })

  test("v1 does not implicitly filter by current directory", async () => {
    await using tmp = await tmpdir({ git: true })
    const dir = `${tmp.path}/.dmux/worktrees/a`
    await mkdir(dir, { recursive: true })

    const key = `worktree-v1-${Date.now()}`
    const app = Server.Default().app
    const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const req = new Request(input, init)
      return app.request(req)
    }) as typeof globalThis.fetch
    const rootSdk = v1({
      baseUrl: "http://opencode.internal",
      directory: tmp.path,
      fetch: fetcher,
    })
    const childSdk = v1({
      baseUrl: "http://opencode.internal",
      directory: dir,
      fetch: fetcher,
    })

    const root = await rootSdk.session.create({ body: { title: `${key}-root` } })
    const child = await childSdk.session.create({ body: { title: `${key}-child` } })
    const res = await childSdk.session.list()
    const ids = (res.data ?? []).map((item) => item.id)

    expect(root.data?.id).toBeDefined()
    expect(child.data?.id).toBeDefined()
    if (!root.data?.id || !child.data?.id) throw new Error("session create did not return ids")
    expect(ids).toContain(root.data.id)
    expect(ids).toContain(child.data.id)
  })
})
