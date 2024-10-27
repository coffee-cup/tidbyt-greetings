load("render.star", "render")

message = "MESSAGE"
author = "AUTHOR"

def main():
  return render.Root(
    child=render.Padding(
      pad=2,
      child=render.Column(
        main_align="center",
        expanded=True,
        children=[
          render.Marquee(
            child=render.Text(
              message,
              font="6x13"
            ),
            width=64,
          ),
          render.Marquee(
            child=render.Text(
              "-" + author,
              font="tb-8"
            ),
            width=64,
          ),
        ],
      )
    )
  )
