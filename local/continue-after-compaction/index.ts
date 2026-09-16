import { Plugin } from "@opencode/plugin"

const CONTINUE =
  "Compaction just happened. Do not wait for the user. Continue from the checkpoint summary and retained recent context. Do not stop."

export default Plugin.define({
  id: "continue-after-compaction",
  setup(ctx) {
    const abort = new AbortController()
    const inflight = new Set<string>()

    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({ signal: abort.signal })) {
          if (event.type !== "session.compaction.ended") continue
          if (event.data.reason === "auto") continue
          const sessionID = event.data.sessionID
          if (inflight.has(sessionID)) continue
          inflight.add(sessionID)
          try {
            await ctx.session.synthetic({ sessionID, text: CONTINUE })
          } catch (error) {
            console.error(error)
          } finally {
            inflight.delete(sessionID)
          }
        }
      } catch (error) {
        if (!abort.signal.aborted) throw error
      }
    })()

    return () => abort.abort()
  },
})
