"use client"

import * as React from "react"

import { ConfigForm } from "@/components/dashboard/article-generator/config-form"
import { ContentWorkspace } from "@/components/dashboard/article-generator/content-workspace"
import { ResizableSplit } from "@/components/dashboard/article-generator/resizable-split"
import { SeoScoringPanel } from "@/components/dashboard/article-generator/seo-scoring-panel"
import { useArticleWorkspace } from "@/components/dashboard/article-generator/use-article-workspace"
import type { ArticleEditorHandle } from "@/components/dashboard/article-generator/editor/article-editor"
import { analyzeSeo, type HeadingInfo } from "@/lib/seo-analysis"

export function ArticleGeneratorPanel() {
  const workspace = useArticleWorkspace()
  const editorRef = React.useRef<ArticleEditorHandle>(null)
  const [editorContent, setEditorContent] = React.useState<{
    text: string
    html: string
    headings: HeadingInfo[]
  } | null>(null)

  const analysis = React.useMemo(() => {
    if (!editorContent) return null
    return analyzeSeo(editorContent.text, editorContent.html, editorContent.headings, workspace.config)
  }, [editorContent, workspace.config])

  return (
    <ResizableSplit
      left={
        <ConfigForm
          config={workspace.config}
          onChange={workspace.updateConfig}
          phase={workspace.phase}
          onGenerate={workspace.generate}
        />
      }
      right={
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
          <div className="min-w-0 flex-1">
            <ContentWorkspace workspace={workspace} editorRef={editorRef} onEditorUpdate={setEditorContent} />
          </div>
          <div className="w-full xl:sticky xl:top-6 xl:w-72 xl:shrink-0">
            <SeoScoringPanel analysis={analysis} />
          </div>
        </div>
      }
    />
  )
}
