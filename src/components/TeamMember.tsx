import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  IconButton, 
  Stack,
  Chip,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  avatar,
  skills,
  socials
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Анимация для карточки
  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    initial: {
      y: 0,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  // Анимация для аватара
  const avatarVariants = {
    hover: {
      scale: 1.1,
      borderColor: theme.palette.primary.main,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    initial: {
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(15, 15, 25, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {/* Аватар, расположенный наполовину за пределами карточки */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: -6
          }}
        >
          <motion.div
            variants={avatarVariants}
            animate={isHovered ? 'hover' : 'initial'}
          >
            <Avatar
              src={avatar}
              alt={name}
              sx={{
                width: 100,
                height: 100,
                border: '4px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
          </motion.div>
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 3, pb: 0 }}>
          {/* Имя и должность */}
          <Typography 
            variant="h5" 
            component="h3" 
            align="center" 
            sx={{ 
              fontWeight: 'bold',
              mb: 0.5,
              background: isHovered 
                ? 'linear-gradient(90deg, #6a11cb, #2575fc)' 
                : 'none',
              WebkitBackgroundClip: isHovered ? 'text' : 'none',
              WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {name}
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 2 }}
          >
            {role}
          </Typography>

          {/* Биография */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 3 }}
          >
            {bio}
          </Typography>

          {/* Навыки */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
            {skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(106, 17, 203, 0.1)',
                  color: theme.palette.primary.light,
                  '&:hover': {
                    bgcolor: 'rgba(106, 17, 203, 0.2)',
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>

        {/* Социальные сети */}
        <Box sx={{ p: 2 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            justifyContent="center"
          >
            {socials.linkedin && (
              <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                <IconButton 
                  aria-label="LinkedIn profile" 
                  component="a" 
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: theme.palette.primary.light,
                    '&:hover': { color: '#0077B5' }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </motion.div>
            )}
            
            {socials.twitter && (
              <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                <IconButton 
                  aria-label="Twitter profile" 
                  component="a" 
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: theme.palette.primary.light,
                    '&:hover': { color: '#1DA1F2' }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </motion.div>
            )}
            
            {socials.github && (
              <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                <IconButton 
                  aria-label="GitHub profile" 
                  component="a" 
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: theme.palette.primary.light,
                    '&:hover': { color: '#fff' }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </motion.div>
            )}
          </Stack>
        </Box>

        {/* Декоративный градиентный элемент */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </Card>
    </motion.div>
  );
};

export default TeamMember; 