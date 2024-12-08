import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const handler = async (_request: Request): Promise<Response> => {
  //TODO: this need not be an edge function, we can make it a postgres call to the database directly!
  //But, I need to verify the token, which only the edge method/function can do that.
  return new Response(
    JSON.stringify({
      message: `Success Created Subscription`,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

Deno.serve(handler);
