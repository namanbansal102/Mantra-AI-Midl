import React from "react";
import { TeamSection } from "@/components/ui/team-section-1"; // Adjust path as necessary
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Linkedin,
} from "lucide-react"; // Example icons from lucide-react

export default function TeamSectionDemo() {
  const teamMembers = [
    {
      name: "NAMAN BANSAL",
      designation: "Blockchain Developer",
      imageSrc:
        "https://avatars.githubusercontent.com/u/131576334?v=4", // Example image for Emma
      socialLinks: [
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
      ],
    }
  ];

  const mainSocialLinks = [
    { icon: Twitter, href: "https://x.com/NamanBansa67011" },
    { icon: Github, href: "https://github.com/namanbansal102" },
  ];

  return (
    <TeamSection
      title="CREATIVE TEAM"
      description="Design intelligent systems that analyze blockchain transactions through dynamic graph visualization and sentiment modeling, uncovering hidden risk patterns, suspicious clusters, and behavioral anomalies in real-time decentralized networks."
      members={teamMembers}
      registerLink="#"
      logo="RAVI" // You could pass an actual SVG or Image component here
      socialLinksMain={mainSocialLinks}
    />
  );
}