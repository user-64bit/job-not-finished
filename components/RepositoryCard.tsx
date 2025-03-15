'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { motion } from 'framer-motion';
import { Star, GitFork, Clock, ExternalLink, AlertCircle, Calendar, Coffee } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface RepositoryCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  html_url?: string;
  index: number;
  isForked?: boolean;
  lastActivity?: number;
  progress?: number;
}

// Language color mapping
const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  null: '#cccccc',
};

// Function to generate a motivational roast based on last activity
const getMotivationalRoast = (days: number, progress: number) => {
  if (days > 90 && progress < 30) {
    return "This project is collecting more dust than your gym membership card.";
  } else if (days > 60 && progress < 50) {
    return "Your project is aging like milk, not wine. Time to revive it!";
  } else if (days > 30 && progress < 70) {
    return "Another day, another excuse not to finish this project.";
  } else if (days > 14) {
    return "Coffee's getting cold. Time to wake up and code!";
  } else {
    return "You're on a roll! Don't stop now!";
  }
};

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  name,
  description,
  language,
  stars,
  forks,
  updatedAt,
  html_url,
  index,
  isForked = false,
  lastActivity = Math.floor(Math.random() * 100),
  progress = Math.floor(Math.random() * 100),
}) => {
  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
  
  const languageColor = languageColors[language as keyof typeof languageColors] || '#cccccc';
  const roast = getMotivationalRoast(lastActivity, progress);
  
  // Determine status color based on last activity and progress
  const getStatusColor = () => {
    if (lastActivity > 60) return "destructive";
    if (lastActivity > 30) return "warning";
    if (lastActivity > 14) return "info";
    return "success";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="h-full overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold truncate">{name}</CardTitle>
            <div className="flex gap-1">
              {isForked && (
                <Badge variant="secondary" className="ml-2">Forked</Badge>
              )}
              {language && (
                <Badge 
                  variant="outline" 
                  className="ml-2 flex items-center gap-1.5"
                  style={{ borderColor: languageColor }}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: languageColor }}
                  ></span>
                  {language}
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="line-clamp-2 h-10 text-muted-foreground">
            {description || "No description provided"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-2">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={16} className="text-yellow-500" />
              <span>{stars.toLocaleString()}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitFork size={16} className="text-blue-500" />
              <span>{forks.toLocaleString()}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock size={16} className="text-green-500" />
              <span>{formattedDate}</span>
            </motion.div>
          </div>
          
          {/* Project Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Project Progress</span>
              <Badge variant={getStatusColor()}>{progress}%</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Motivational Roast */}
          <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
            <Coffee size={16} className="text-amber-500 mt-0.5" />
            <p className="text-xs italic">{roast}</p>
          </div>
          
          {/* Last Activity */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            <span>{lastActivity} days since last activity</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 gap-2">
          {html_url && (
            <motion.div className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => window.open(html_url, '_blank')}
              >
                <ExternalLink size={14} />
                View Repository
              </Button>
            </motion.div>
          )}
          <motion.div className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="default" 
              size="sm" 
              className="w-full gap-1"
            >
              <AlertCircle size={14} />
              Set Reminder
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RepositoryCard; 