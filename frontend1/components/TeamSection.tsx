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
      name: "EMMA",
      designation: "Product Designer",
      imageSrc:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image for Emma
      socialLinks: [
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
      ],
    },
    {
      name: "HENRY",
      designation: "Lead Developer",
      imageSrc:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image for Henry
      socialLinks: [
        { icon: Github, href: "#" },
        { icon: Twitter, href: "#" },
      ],
    },
    {
      name: "JOHN",
      designation: "Marketing Specialist",
      imageSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image for John
      socialLinks: [
        { icon: Facebook, href: "#" },
        { icon: Instagram, href: "#" },
      ],
    },
  ];

  const mainSocialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <TeamSection
      title="CREATIVE TEAM"
      description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
      members={teamMembers}
      registerLink="#"
      logo="RAVI" // You could pass an actual SVG or Image component here
      socialLinksMain={mainSocialLinks}
    />
  );
}