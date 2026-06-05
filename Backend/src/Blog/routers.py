from fastapi import APIRouter
from src.database import posts
from src.Blog.schemas import Post

router = APIRouter(

    prefix = "/blog",    # prefisso per raggiungere gli endpoint di router
    tags=["Blog"]
)


@router.get("/post")
async def get_post(id_post: int):
    for post in posts:
        if post["id"] == id_post:
            return post
        
    return False;


@router.post("/post", response_model=list[Post])           # response_model: tipo di ritorno
async def create_post(content: Post) -> list[dict]:     # -> *: tipo di ritorno del post
    posts.append(content)
    return posts
