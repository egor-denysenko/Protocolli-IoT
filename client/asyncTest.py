import asyncio
from asyncio.tasks import sleep
import time

value = 1

async def test():
    print("1")
    await asyncio.sleep(5)
    print("2")

start = time.time()

loop = asyncio.get_event_loop()
tasks = [
    loop.create_task(test()),
    loop.create_task(test())
]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()