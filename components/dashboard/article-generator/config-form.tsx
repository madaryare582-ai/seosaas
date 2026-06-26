"use client"

import { Loader2, Sparkles } from "lucide-react"

import type { WorkspacePhase } from "@/components/dashboard/article-generator/use-article-workspace"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { ArticleConfig } from "@/lib/article-ai-content"

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export function ConfigForm({
  config,
  onChange,
  phase,
  onGenerate,
}: {
  config: ArticleConfig
  onChange: (patch: Partial<ArticleConfig>) => void
  phase: WorkspacePhase
  onGenerate: () => void
}) {
  const isGenerating = phase === "generating"

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6"
      onSubmit={(event) => {
        event.preventDefault()
        onGenerate()
      }}
    >
      <div>
        <p className="text-sm font-medium text-foreground">Article Configuration Center</p>
        <p className="text-xs text-muted-foreground">Tune the inputs below, then generate your article.</p>
      </div>

      <Field id="primary-keyword" label="Primary Keyword">
        <Input
          id="primary-keyword"
          placeholder="e.g. topical authority"
          value={config.primaryKeyword}
          onChange={(e) => onChange({ primaryKeyword: e.target.value })}
          disabled={isGenerating}
        />
      </Field>

      <Field id="secondary-keywords" label="Secondary Keywords">
        <Textarea
          id="secondary-keywords"
          placeholder="topic clusters, entity seo, content silos"
          value={config.secondaryKeywords}
          onChange={(e) => onChange({ secondaryKeywords: e.target.value })}
          disabled={isGenerating}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="search-intent" label="Search Intent">
          <Select
            value={config.searchIntent}
            onValueChange={(v) => onChange({ searchIntent: v as ArticleConfig["searchIntent"] })}
            disabled={isGenerating}
          >
            <SelectTrigger id="search-intent" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="informational">Informational</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="transactional">Transactional</SelectItem>
              <SelectItem value="navigational">Navigational</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="target-country" label="Target Country">
          <Select value={config.targetCountry} onValueChange={(v) => onChange({ targetCountry: v })} disabled={isGenerating}>
            <SelectTrigger id="target-country" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Global">Global</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="language" label="Language">
          <Select value={config.language} onValueChange={(v) => onChange({ language: v })} disabled={isGenerating}>
            <SelectTrigger id="language" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="tone" label="Article Tone">
          <Select value={config.tone} onValueChange={(v) => onChange({ tone: v as ArticleConfig["tone"] })} disabled={isGenerating}>
            <SelectTrigger id="tone" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="witty">Witty</SelectItem>
              <SelectItem value="empathetic">Empathetic</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="content-goal" label="Content Goal">
          <Select value={config.contentGoal} onValueChange={(v) => onChange({ contentGoal: v as ArticleConfig["contentGoal"] })} disabled={isGenerating}>
            <SelectTrigger id="content-goal" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rank-on-google">Rank on Google</SelectItem>
              <SelectItem value="drive-conversions">Drive Conversions</SelectItem>
              <SelectItem value="build-authority">Build Authority</SelectItem>
              <SelectItem value="educate-audience">Educate Audience</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field id="audience-type" label="Audience Type">
          <Select value={config.audienceType} onValueChange={(v) => onChange({ audienceType: v as ArticleConfig["audienceType"] })} disabled={isGenerating}>
            <SelectTrigger id="audience-type" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginners">Beginners</SelectItem>
              <SelectItem value="professionals">Professionals</SelectItem>
              <SelectItem value="general-consumers">General Consumers</SelectItem>
              <SelectItem value="b2b-decision-makers">B2B Decision-Makers</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="article-length" label="Article Length">
        <Select value={config.articleLength} onValueChange={(v) => onChange({ articleLength: v as ArticleConfig["articleLength"] })} disabled={isGenerating}>
          <SelectTrigger id="article-length" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (~800 words)</SelectItem>
            <SelectItem value="medium">Medium (~1,500 words)</SelectItem>
            <SelectItem value="long">Long (~2,500 words)</SelectItem>
            <SelectItem value="pillar">Pillar (~4,000+ words)</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <div className="flex flex-col gap-2">
        <ToggleRow
          label="Include FAQ"
          description="Add a frequently-asked-questions section"
          checked={config.includeFaq}
          onCheckedChange={(v) => onChange({ includeFaq: v })}
        />
        <ToggleRow
          label="Include Key Takeaways"
          description="Summary bullets near the top"
          checked={config.includeKeyTakeaways}
          onCheckedChange={(v) => onChange({ includeKeyTakeaways: v })}
        />
        <ToggleRow
          label="Include Comparison Table"
          description="Add a feature comparison table"
          checked={config.includeComparisonTable}
          onCheckedChange={(v) => onChange({ includeComparisonTable: v })}
        />
        <ToggleRow
          label="Include Statistics"
          description="Add placeholder data points to verify and fill in"
          checked={config.includeStatistics}
          onCheckedChange={(v) => onChange({ includeStatistics: v })}
        />
        <ToggleRow
          label="Include Internal Linking Suggestions"
          description="Suggested internal link opportunities"
          checked={config.includeInternalLinking}
          onCheckedChange={(v) => onChange({ includeInternalLinking: v })}
        />
        <ToggleRow
          label="Include External References"
          description="Suggested spots to cite an authoritative source"
          checked={config.includeExternalReferences}
          onCheckedChange={(v) => onChange({ includeExternalReferences: v })}
        />
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="advanced">
          <AccordionTrigger>Advanced Controls</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <Field id="expertise-level" label="Expertise Level">
              <Select value={config.expertiseLevel} onValueChange={(v) => onChange({ expertiseLevel: v as ArticleConfig["expertiseLevel"] })} disabled={isGenerating}>
                <SelectTrigger id="expertise-level" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field id="content-freshness" label="Content Freshness Preference">
              <Select value={config.contentFreshness} onValueChange={(v) => onChange({ contentFreshness: v as ArticleConfig["contentFreshness"] })} disabled={isGenerating}>
                <SelectTrigger id="content-freshness" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="evergreen">Evergreen</SelectItem>
                  <SelectItem value="current-year">Current Year Focus</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field id="brand-voice" label="Brand Voice">
              <Select value={config.brandVoice} onValueChange={(v) => onChange({ brandVoice: v as ArticleConfig["brandVoice"] })} disabled={isGenerating}>
                <SelectTrigger id="brand-voice" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="friendly-expert">Friendly Expert</SelectItem>
                  <SelectItem value="witty">Witty</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <Label>AI Creativity</Label>
                <span className="text-xs text-muted-foreground">{config.creativity}%</span>
              </div>
              <Slider
                value={[config.creativity]}
                onValueChange={([v]) => onChange({ creativity: v })}
                disabled={isGenerating}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <Label>SEO Aggressiveness</Label>
                <span className="text-xs text-muted-foreground">{config.seoAggressiveness}%</span>
              </div>
              <Slider
                value={[config.seoAggressiveness]}
                onValueChange={([v]) => onChange({ seoAggressiveness: v })}
                disabled={isGenerating}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        type="submit"
        disabled={isGenerating}
        className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400 disabled:pointer-events-none disabled:opacity-80"
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles />
            Generate Article
          </>
        )}
      </Button>
    </form>
  )
}
