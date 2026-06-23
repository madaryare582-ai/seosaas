"use client"

import { ArticleOutputPanel } from "@/components/dashboard/article-generator/article-output-panel"
import { GenerateForm } from "@/components/dashboard/article-generator/generate-form"
import { useArticleGeneration } from "@/components/dashboard/article-generator/use-article-generation"

export function ArticleGeneratorPanel() {
  const generation = useArticleGeneration()

  return (
    <>
      <GenerateForm
        phase={generation.phase}
        stepIndex={generation.stepIndex}
        progress={generation.progress}
        onGenerate={generation.start}
      />

      {generation.phase !== "idle" && (
        <ArticleOutputPanel
          phase={generation.phase}
          revealCount={generation.revealCount}
          wordCount={generation.wordCount}
          readingTime={generation.readingTime}
          status={generation.status}
          progress={generation.progress}
          seoScore={generation.seoScore}
        />
      )}
    </>
  )
}
