import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Chip, 
  Stack, 
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Анимация выезжающей биографии
  const bioVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  // Анимация карточки при наведении
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  };

  // Анимация градиентной рамки
  const borderVariants = {
    initial: { opacity: 0.3 },
    hover: { opacity: 1 }
  };

  const socialIcons = {
    twitter: <TwitterIcon fontSize="small" />,
    linkedin: <LinkedInIcon fontSize="small" />,
    github: <GitHubIcon fontSize="small" />,
    website: <LanguageIcon fontSize="small" />
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          position: 'relative',
          padding: '2px', // Место для градиентной рамки
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          overflow: 'hidden'
        }}
      >
        <motion.div
          variants={borderVariants}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              zIndex: 0
            }}
          />
        </motion.div>

        <Card
          sx={{
            height: '100%',
            borderRadius: '14px',
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              zIndex: 0
            }
          }}
        >
          <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={member.avatar}
                alt={member.name}
                sx={{
                  width: 110,
                  height: 110,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                  mb: 2,
                  transition: 'all 0.3s ease',
                }}
              />

              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 0.5
                }}
              >
                {member.name}
              </Typography>

              <Typography 
                variant="subtitle1" 
                color="primary" 
                sx={{ 
                  fontWeight: 'medium',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                {member.role}
              </Typography>

              <motion.div
                variants={bioVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    textAlign: 'center',
                    mb: 2,
                    lineHeight: 1.6
                  }}
                >
                  {member.bio}
                </Typography>
              </motion.div>

              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ 
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  mt: 2,
                  mb: 3,
                  gap: 1
                }}
              >
                {member.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                      color: theme.palette.text.primary,
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 'medium'
                    }}
                  />
                ))}
              </Stack>

              <Stack direction="row" spacing={1} justifyContent="center">
                {Object.entries(member.social).map(([platform, url]) => (
                  url && (
                    <IconButton
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        color: theme.palette.text.secondary,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: platform === 'twitter' ? '#1DA1F2' : 
                                 platform === 'linkedin' ? '#0A66C2' : 
                                 platform === 'github' ? '#24292e' : 
                                 theme.palette.primary.main,
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      {socialIcons[platform as keyof typeof socialIcons]}
                    </IconButton>
                  )
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default TeamMemberCard; 