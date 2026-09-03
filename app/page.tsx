"use client";

import { useState } from "react";

type AnalysisResult = {
  atsScore?: number;
  jobMatchScore?: number;
  overallSummary?: string;
  strengths?: string[];
  weaknesses?: string[];
  missingSkills?: string[];
  missingKeywords?: string[];
  improvements?: string[];
  recommendation?: string;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!resume.trim()) {
      alert("Please paste your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    setLoading(true);
    setGenerated(false);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      console.log("AI Resume Analysis:", data.result);

      setResult(data.result);
      setGenerated(true);

      setTimeout(() => {
        document
          .getElementById("analysis-result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (error) {
      console.error("Analyze error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-lime-950 via-lime-950/60 to-black text-white">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-lime-400/15 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-lime-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[55%] h-[350px] w-[350px] rounded-full bg-lime-500/10 blur-[140px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-lime-400/10 bg-zinc-950/70 px-4 py-4 shadow-2xl shadow-lime-950/20 backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">
        <div className="flex items-center justify-between gap-4">

          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-lime-400/20 bg-white/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a
              href="#home"
              className="transition hover:text-lime-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-lime-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-lime-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-lime-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime-400 px-5 py-2 font-medium text-black shadow-lg shadow-lime-400/20 transition hover:bg-lime-300"
            >
              Follow
            </a>
          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs text-lime-300 transition hover:bg-lime-400/20 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="relative z-30 mx-4 mt-2 rounded-3xl border border-lime-400/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">

            {[
              ["#home", "Home"],
              ["#features", "Features"],
              ["#how", "How To Use"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-lime-400/10 hover:text-lime-300"
              >
                {label}
              </a>
            ))}

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-lime-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Follow
            </a>
          </div>
        </div>
      )}

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs text-lime-200">
          ✨ AI-Powered Resume Analysis
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-lime-400">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Make Your Resume
          <br />
          <span className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 bg-clip-text text-transparent">
            Job-Ready With AI.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Analyze your resume with AI, discover its strengths and weaknesses,
          find missing skills, improve your ATS score and see how well it
          matches your target job.
        </p>

        {/* PILLS */}

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">
          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            📊 ATS Score
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            🎯 Job Match
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            💡 AI Suggestions
          </span>
        </div>

        {/* ANALYZER */}

        <div
          id="analyzer"
          className="mt-12 w-full max-w-4xl"
        >
          <div className="w-full rounded-[2rem] border border-lime-400/10 bg-zinc-950/60 p-4 text-left shadow-2xl shadow-lime-950/30 backdrop-blur-2xl sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
              AI Resume Analyzer
            </p>

            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Let's improve your resume.
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Add your resume and the job description you're targeting.
            </p>

            <div className="mt-7 space-y-5">

              {/* RESUME */}

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Your Resume
                </label>

                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume content here..."
                  rows={10}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-lime-400/50 focus:ring-2 focus:ring-lime-400/10 sm:px-5"
                />
              </div>

              {/* JOB DESCRIPTION */}

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Target Job Description
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(e.target.value)
                  }
                  placeholder="Paste the job description you're applying for..."
                  rows={8}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-lime-400/50 focus:ring-2 focus:ring-lime-400/10 sm:px-5"
                />
              </div>

              {/* BUTTON */}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-lime-400 px-5 text-sm font-semibold text-black shadow-xl shadow-lime-400/20 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "🧠 Analyzing Your Resume..."
                  : "✨ Analyze My Resume"}
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-600">
              AI-generated suggestions should be reviewed before making final
              changes to your resume.
            </p>
          </div>
        </div>

      </section>

      {/* ============================= */}
      {/* AI ANALYSIS RESULT */}
      {/* ============================= */}

      {generated && result && (
        <section
          id="analysis-result"
          className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-8 px-4 py-16 sm:px-8"
        >

          <div className="rounded-[2rem] border border-lime-400/10 bg-zinc-950/60 p-5 shadow-2xl shadow-lime-950/30 backdrop-blur-2xl sm:p-8">

            {/* RESULT HEADER */}

            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
                AI Analysis Result
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Your Resume Analysis
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
                Here's what AI found in your resume compared with the target
                job.
              </p>
            </div>

            {/* SCORE CARDS */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {/* ATS */}

              <ScoreCard
                title="ATS Score"
                score={result.atsScore}
                icon="📊"
              />

              {/* JOB MATCH */}

              <ScoreCard
                title="Job Match"
                score={result.jobMatchScore}
                icon="🎯"
              />

            </div>

            {/* OVERALL SUMMARY */}

            <ResultCard
              title="📋 Overall Summary"
              content={result.overallSummary}
            />

            {/* STRENGTHS */}

            <ListResultCard
              title="💪 Strengths"
              items={result.strengths}
              emptyText="No strengths were returned."
              bullet="✓"
            />

            {/* WEAKNESSES */}

            <ListResultCard
              title="⚠️ Weaknesses"
              items={result.weaknesses}
              emptyText="No weaknesses were returned."
              bullet="!"
            />

            {/* MISSING SKILLS */}

            <ListResultCard
              title="🧠 Missing Skills"
              items={result.missingSkills}
              emptyText="No missing skills identified."
              bullet="•"
            />

            {/* MISSING KEYWORDS */}

            <ListResultCard
              title="🔎 Missing Keywords"
              items={result.missingKeywords}
              emptyText="No missing keywords identified."
              bullet="#"
            />

            {/* IMPROVEMENTS */}

            <ListResultCard
              title="💡 AI Improvements"
              items={result.improvements}
              emptyText="No improvement suggestions returned."
              bullet="→"
            />

            {/* RECOMMENDATION */}

            <ResultCard
              title="🎯 Recommendation"
              content={result.recommendation}
              fallback="No recommendation available."
            />

          </div>
        </section>
      )}

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
            What You Get
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Know exactly what to improve.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Get useful AI insights that help make your resume stronger,
            clearer and more relevant to your target job.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="📊"
            title="ATS Score"
            description="Understand how well your resume is optimized for applicant tracking systems."
          />

          <FeatureCard
            icon="🎯"
            title="Job Match"
            description="Compare your resume with a target job description and identify relevant matches."
          />

          <FeatureCard
            icon="💡"
            title="AI Improvements"
            description="Get practical suggestions for improving your resume content and presentation."
          />

          <FeatureCard
            icon="💪"
            title="Strengths"
            description="Discover the strongest parts of your resume and what already works well."
          />

          <FeatureCard
            icon="⚠️"
            title="Weaknesses"
            description="Find gaps, unclear sections and areas that could reduce your chances."
          />

          <FeatureCard
            icon="🧠"
            title="Missing Skills"
            description="Identify important skills and keywords missing for your target position."
          />

        </div>
      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Analyze and improve your resume in just a few simple steps.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Add Your Resume"
            description="Paste your resume content into the analyzer so AI can understand your experience."
          />

          <StepCard
            number="02"
            title="Add Job Description"
            description="Paste the job description for the position you want to apply for."
          />

          <StepCard
            number="03"
            title="Analyze With AI"
            description="Get your ATS score, job match, missing skills and personalized improvement suggestions."
          />

        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="What does the AI Resume Analyzer check?"
            answer="It can analyze your resume for ATS optimization, strengths, weaknesses, missing skills, keywords and relevance to a target job."
          />

          <Faq
            question="Can I analyze my resume for a specific job?"
            answer="Yes. Add the job description along with your resume to get a more targeted analysis."
          />

          <Faq
            question="What is an ATS score?"
            answer="An ATS score is an estimate of how well your resume matches common applicant tracking system requirements and the target job."
          />

          <Faq
            question="Will AI rewrite my resume?"
            answer="The analyzer focuses on identifying improvements and giving suggestions. A future version can also include AI-powered rewriting."
          />

        </div>
      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-8">

        <div className="rounded-[2rem] border border-lime-400/10 bg-lime-950/20 px-5 py-14 text-center shadow-2xl shadow-lime-950/30 backdrop-blur-xl sm:px-12">

          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-lime-400/20 bg-white/5">
            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Give your resume an AI-powered upgrade.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Discover what is working, what is missing and how you can make
            your resume stronger for your target job.
          </p>

          <a
            href="#analyzer"
            className="mt-8 inline-flex rounded-xl bg-lime-400 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-lime-400/20 transition hover:bg-lime-300"
          >
            ✨ Analyze Resume
          </a>

        </div>
      </section>

 {/* FOOTER */}

<footer className="relative z-10 border-t border-white/5 px-4 py-14">

  <div className="mx-auto w-full max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-12">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
          Explore More
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          More AI Career Tools
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Explore more AI-powered tools to improve your resume,
          applications and professional career.
        </p>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* AI RESUME GENERATOR */}

        <a
          href="https://airesumegenerator.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-lime-400/20 hover:bg-lime-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-400/10 bg-lime-400/10 text-lg">
            📄
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-lime-300">
            AI Resume Generator
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Create a professional resume tailored to your career goals.
          </p>

        </a>

        {/* AI COVER LETTER GENERATOR */}

        <a
          href="https://aicoverlettergenerator.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-lime-400/20 hover:bg-lime-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-400/10 bg-lime-400/10 text-lg">
            💼
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-lime-300">
            AI Cover Letter Generator
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Create personalized cover letters for your job applications.
          </p>

        </a>

        {/* AI EMAIL WRITER */}

        <a
          href="https://aiemailwriter.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-lime-400/20 hover:bg-lime-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-400/10 bg-lime-400/10 text-lg">
            ✉️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-lime-300">
            AI Email Writer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Write professional emails quickly with AI.
          </p>

        </a>

        {/* AI GRAMMAR & WRITING FIXER */}

        <a
          href="https://aigrammarwritingfixer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-lime-400/20 hover:bg-lime-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-400/10 bg-lime-400/10 text-lg">
            ✍️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-lime-300">
            AI Grammar & Writing Fixer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Fix grammar, spelling and improve your writing with AI.
          </p>

        </a>

      </div>

    </div>

    {/* FOOTER MAIN */}

    <div className="border-t border-white/5 pt-8">

      <div className="flex flex-col items-center justify-between gap-7 sm:flex-row">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-lime-400/20 bg-white/5">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              KrishAIWorks
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              AI Solutions That Work
            </p>

          </div>

        </div>

        <p className="text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks. Built with AI.
        </p>

      </div>

    </div>

  </div>

</footer>

    </main>
  );
}

/* ========================================================= */
/* SCORE CARD */
/* ========================================================= */

function ScoreCard({
  title,
  score,
  icon,
}: {
  title: string;
  score?: number;
  icon: string;
}) {
  const safeScore =
    typeof score === "number"
      ? Math.max(0, Math.min(100, score))
      : 0;

  return (
    <div className="rounded-3xl border border-white/5 bg-black/30 p-6 text-center backdrop-blur-xl">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-3 text-sm font-medium text-zinc-400">
        {title}
      </p>

      <div className="mt-3">
        <span className="text-4xl font-extrabold text-lime-400">
          {safeScore}
        </span>

        <span className="ml-1 text-sm text-zinc-600">
          /100
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-lime-400 transition-all duration-700"
          style={{
            width: `${safeScore}%`,
          }}
        />
      </div>

    </div>
  );
}

/* ========================================================= */
/* TEXT RESULT CARD */
/* ========================================================= */

function ResultCard({
  title,
  content,
  fallback = "No information available.",
}: {
  title: string;
  content?: string;
  fallback?: string;
}) {
  const safeContent =
    typeof content === "string" && content.trim()
      ? content.trim()
      : fallback;

  return (
    <div className="mt-6 rounded-3xl border border-white/5 bg-black/30 p-6 backdrop-blur-xl">

      <h3 className="text-base font-bold text-lime-300 sm:text-lg">
        {title}
      </h3>

      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">
        {safeContent}
      </p>

    </div>
  );
}

/* ========================================================= */
/* LIST RESULT CARD */
/* ========================================================= */

function ListResultCard({
  title,
  items,
  emptyText,
  bullet,
}: {
  title: string;
  items?: string[];
  emptyText: string;
  bullet: string;
}) {
  const safeItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          typeof item === "string" && item.trim()
      )
    : [];

  return (
    <div className="mt-6 rounded-3xl border border-white/5 bg-black/30 p-6 backdrop-blur-xl">

      <h3 className="text-base font-bold text-lime-300 sm:text-lg">
        {title}
      </h3>

      {safeItems.length > 0 ? (
        <ul className="mt-5 space-y-3">

          {safeItems.map((item, index) => (
            <li
              key={`${title}-${index}`}
              className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-zinc-400"
            >
              <span className="shrink-0 font-bold text-lime-400">
                {bullet}
              </span>

              <span>{item}</span>
            </li>
          ))}

        </ul>
      ) : (
        <p className="mt-4 text-sm text-zinc-600">
          {emptyText}
        </p>
      )}

    </div>
  );
}

/* ========================================================= */
/* FEATURE CARD */
/* ========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/20">

      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime-400/10 bg-lime-400/10 text-xl transition group-hover:bg-lime-400/15">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ========================================================= */
/* STEP CARD */
/* ========================================================= */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/15">

      <span className="text-sm font-bold text-lime-400">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ========================================================= */
/* FAQ */
/* ========================================================= */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/5 bg-zinc-950/40 p-5 backdrop-blur-xl transition hover:border-lime-400/15">

      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200 sm:text-base">

        <div className="flex items-center justify-between gap-4">

          <span>{question}</span>

          <span className="text-xl text-lime-400 transition group-open:rotate-45">
            +
          </span>

        </div>

      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}