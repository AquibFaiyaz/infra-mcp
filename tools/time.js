export function registerTimeTool(server) {
  server.tool(
    "get_server_time",
    "Returns current server time",
    {},
    async () => ({
      content: [
        {
          type: "text",
          text: new Date().toISOString(),
        },
      ],
    })
  );
}