import { Extension } from "@tiptap/core"
import { ReactRenderer } from "@tiptap/react"
import Suggestion, { type SuggestionProps } from "@tiptap/suggestion"

import { SLASH_COMMANDS, SlashCommandMenu, type SlashCommandItem } from "./slash-command-menu"

type MenuRef = { onKeyDown: (props: { event: KeyboardEvent }) => boolean }

export const SlashCommand = Extension.create({
  name: "slashCommand",

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        startOfLine: false,
        items: ({ query }: { query: string }) =>
          SLASH_COMMANDS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 10),
        command: ({ editor, range, props }) => {
          const item = props as SlashCommandItem
          item.run(editor, range)
        },
        render: () => {
          let component: ReactRenderer<MenuRef> | null = null
          let popup: HTMLDivElement | null = null

          const updatePosition = (props: SuggestionProps<SlashCommandItem>) => {
            if (!popup) return
            const coords = props.editor.view.coordsAtPos(props.range.from)
            popup.style.left = `${coords.left + window.scrollX}px`
            popup.style.top = `${coords.bottom + window.scrollY + 6}px`
          }

          return {
            onStart: (props) => {
              component = new ReactRenderer(SlashCommandMenu, {
                props: { items: props.items, command: props.command },
                editor: props.editor,
              })
              popup = document.createElement("div")
              popup.style.position = "absolute"
              popup.style.zIndex = "70"
              document.body.appendChild(popup)
              popup.appendChild(component.element)
              updatePosition(props)
            },
            onUpdate: (props) => {
              component?.updateProps({ items: props.items, command: props.command })
              updatePosition(props)
            },
            onKeyDown: (props) => {
              if (props.event.key === "Escape") {
                popup?.remove()
                return true
              }
              return component?.ref?.onKeyDown(props) ?? false
            },
            onExit: () => {
              popup?.remove()
              component?.destroy()
            },
          }
        },
      }),
    ]
  },
})
