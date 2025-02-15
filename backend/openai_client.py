from openai import OpenAI
from supporting_files.config import OPENAI_API_KEY

class OpenAiClient:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def text_request(self, messages, response_format=""):
        completion = self.client.chat.completions.create(
            model="gpt-4o-mini",
            store=True,
            messages=messages,
            response_format={"type": response_format}
        )

        return completion.choices[0].message.content
    
openai_client = OpenAiClient()