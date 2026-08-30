import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://airesumeanalyzer.krishaiworks.com"),

  title: {
    default: "AI Resume Analyzer | ATS Resume Checker & Score",
    template: "%s | AI Resume Analyzer",
  },

  description:
    "Analyze your resume with AI. Get an ATS score, identify strengths and weaknesses, find missing skills, and receive actionable resume improvement suggestions.",

  keywords: [
    "AI Resume Analyzer",
    "AI Resume Checker",
    "ATS Resume Checker",
    "ATS Resume Analyzer",
    "Resume ATS Score",
    "Resume Score",
    "Resume Analysis",
    "AI Resume Review",
    "Resume Improvement",
    "ATS Optimization",
    "Resume Keywords",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "AI Resume Analyzer",

  category: "technology",

  alternates: {
    canonical: "https://airesumeanalyzer.krishaiworks.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://airesumeanalyzer.krishaiworks.com",
    siteName: "KrishAIWorks",
    title: "AI Resume Analyzer | ATS Resume Checker & Score",
    description:
      "Analyze your resume with AI, check ATS compatibility, find missing skills, and improve your resume.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AI Resume Analyzer - KrishAIWorks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Analyzer | ATS Resume Checker",
    description:
      "Analyze your resume with AI, get an ATS score and discover ways to improve your resume.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}