import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from 'eventsource-parser'
  
  export async function OpenAIStream(payload: any) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization':'org-gVT4emBQKQ6pzZy5yVWotk9s'
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(error => {
      console.error('Error while fetching data from API:', Error);
    });

    if(res?.status !== 200){
      console.log(res?.status);
      const errorResponse = await res?.json();
      console.log(errorResponse);
      return;
    }
  
    const stream = new ReadableStream({
      async start(controller) {
        function onParse(event: ParsedEvent | ReconnectInterval) {
          if (event.type === 'event') {
            const data = event.data
            if (data === '[DONE]') {
              controller.close()
              return
            }
            try {
              const json = JSON.parse(data)
              const text = json.choices[0].delta.content
              const queue = encoder.encode(text)
              controller.enqueue(queue)
            } catch (e) {
              controller.error(e)
            }
          }
        }
  
        const parser = createParser(onParse)
        for await (const chunk of res?.body as any) {
          parser.feed(decoder.decode(chunk))
        }
      },
    })
    return stream
  }