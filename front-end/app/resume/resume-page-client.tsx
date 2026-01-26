'use client';

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Globe, Github, Linkedin, GraduationCap, Briefcase } from "lucide-react";
import renderData from "@/app/resume/data/data";

export default function ResumePageClient() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {renderData.user.name} {renderData.user.surname}
          </h1>
          <p className="text-xl text-primary font-medium mb-6">
            {renderData.user.position}
          </p>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              {renderData.user.Address}
            </span>
            <a href={`mailto:${renderData.user.Email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={18} className="text-primary" />
              {renderData.user.Email}
            </a>
            <a href={renderData.user.Website.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Globe size={18} className="text-primary" />
              {renderData.user.Website.title}
            </a>
            <a href={renderData.user.GitHub.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Github size={18} className="text-primary" />
              GitHub
            </a>
            <a href={renderData.user.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin size={18} className="text-primary" />
              LinkedIn
            </a>
          </div>
          
          <div className="mt-4 text-muted-foreground">
            🌍 I speak {renderData.contacts["I speak"]}
          </div>
        </motion.div>

        {/* About Me */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {renderData.intro.title}
          </h2>
          <div className="glass-panel border border-border/50 rounded-xl p-6">
            <div className="space-y-4 text-muted-foreground">
              {renderData.intro.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Skills</h2>
          <div className="grid gap-4">
            {renderData.skills.map((skill) => (
              <div key={skill.name} className="glass-panel border border-border/50 rounded-xl p-6">
                <h3 className="text-lg text-primary font-semibold mb-2">{skill.name}</h3>
                <div className="text-muted-foreground">
                  {Array.isArray(skill.description) 
                    ? skill.description.map((desc, i) => <p key={i}>{desc}</p>)
                    : <p>{skill.description}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Work History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase size={24} className="text-primary" />
            Work History
          </h2>
          <div className="space-y-6">
            {renderData.experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="glass-panel border border-border/50 rounded-xl p-6 hover-lift">
                  <div className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        {job.website ? (
                          <a href={job.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <h3 className="text-xl font-bold">{job.company}</h3>
                          </a>
                        ) : (
                          <h3 className="text-xl font-bold">{job.company}</h3>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-primary font-medium">{job.dateStart} - {job.dateEnd || 'Present'}</p>
                      </div>
                    </div>
                    
                    {job.description && job.description.length > 0 && (
                      <div className="text-muted-foreground text-sm mb-3">
                        {job.description.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </div>
                    )}
                    
                    {job.stack && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.stack.split(', ').map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs rounded-md border border-primary/30 text-primary bg-primary/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {job.positions && job.positions.map((position, posIndex) => (
                    <div key={posIndex} className="pt-2 border-t border-border/30">
                      <h4 className="font-semibold text-foreground mb-2">{position.title}</h4>
                      {position.positionDescription && (
                        <p className="text-sm text-muted-foreground italic mb-2">{position.positionDescription}</p>
                      )}
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {position.description.map((resp, respIndex) => (
                          <li key={respIndex}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap size={24} className="text-primary" />
            Education
          </h2>
          {renderData.education.reduce<{ university: string; items: typeof renderData.education }[]>((acc, item) => {
            const existing = acc.find(g => g.university === item.company);
            if (existing) {
              existing.items.push(item);
            } else {
              acc.push({ university: item.company, items: [item] });
            }
            return acc;
          }, []).map((group, index) => (
            <div key={index} className="glass-panel border border-border/50 rounded-xl p-6 mb-4">
              <h3 className="text-lg font-bold text-foreground mb-4">{group.university}</h3>
              <div className="space-y-3">
                {group.items.map((edu, eduIndex) => (
                  <div key={eduIndex} className="flex flex-col md:flex-row md:justify-between gap-1">
                    <div className="flex-1">
                      <p className="text-muted-foreground">{edu.title}</p>
                      {Array.isArray(edu.description) && edu.description.length > 0 && (
                        <p className="text-sm text-muted-foreground italic">{edu.description.join(', ')}</p>
                      )}
                    </div>
                    <span className="text-sm text-primary font-medium">{edu.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}
