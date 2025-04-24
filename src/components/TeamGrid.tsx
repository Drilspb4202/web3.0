import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Tab, 
  Tabs, 
  useTheme,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TeamMemberCard, { TeamMember } from './TeamMemberCard';

// Данные о членах команды
const teamMembers: TeamMember[] = [
  {
    name: "Алекс Родригес",
    role: "CEO & Founder",
    bio: "Визионер DeFi с 10-летним опытом в криптовалютах. Основал Chihuahua Capital с миссией сделать DeFi доступным для всех.",
    avatar: "https://avatars.dicebear.com/api/micah/alex.svg",
    skills: ["DeFi", "Strategy", "Leadership", "Tokenomics"],
    social: {
      twitter: "https://twitter.com/alexrodriguez",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      github: "https://github.com/alexrodriguez",
      website: "https://alexrodriguez.com"
    }
  },
  {
    name: "Мария Чен",
    role: "CTO",
    bio: "Блокчейн-инженер с опытом в Ethereum и Solana. Руководит техническим видением и архитектурой Chihuahua Capital.",
    avatar: "https://avatars.dicebear.com/api/micah/maria.svg",
    skills: ["Solidity", "Rust", "Smart Contracts", "Layer 2"],
    social: {
      github: "https://github.com/mariachen",
      linkedin: "https://linkedin.com/in/mariachen",
      twitter: "https://twitter.com/mariachen",
    }
  },
  {
    name: "Джейсон Пак",
    role: "Lead Developer",
    bio: "Full-stack разработчик с глубоким знанием блокчейн-технологий. Создает пользовательские интерфейсы, которые делают DeFi простым и понятным.",
    avatar: "https://avatars.dicebear.com/api/micah/jason.svg",
    skills: ["React", "TypeScript", "Web3.js", "Ethers.js"],
    social: {
      github: "https://github.com/jasonpark",
      twitter: "https://twitter.com/jasonpark",
    }
  },
  {
    name: "София Петрова",
    role: "Head of Research",
    bio: "PhD в области криптографии. Руководит исследованиями для обеспечения безопасности и инноваций в протоколах Chihuahua Capital.",
    avatar: "https://avatars.dicebear.com/api/micah/sophia.svg",
    skills: ["Cryptography", "ZK-Proofs", "Security", "Protocol Design"],
    social: {
      linkedin: "https://linkedin.com/in/sophiapetrova",
      twitter: "https://twitter.com/sophiapetrova",
    }
  },
  {
    name: "Дэвид Окампо",
    role: "Smart Contract Engineer",
    bio: "Специалист по смарт-контрактам с опытом проведения аудитов безопасности. Обеспечивает надежность протоколов Chihuahua Capital.",
    avatar: "https://avatars.dicebear.com/api/micah/david.svg",
    skills: ["Solidity", "Security Audits", "ERC Standards", "DeFi Protocols"],
    social: {
      github: "https://github.com/davidocampo",
      twitter: "https://twitter.com/davidocampo",
    }
  },
  {
    name: "Эмма Вонг",
    role: "Community Manager",
    bio: "Эксперт по построению сообществ в Web3. Создаёт экосистему Chihuahua Capital, помогая пользователям и разработчикам.",
    avatar: "https://avatars.dicebear.com/api/micah/emma.svg",
    skills: ["Community Building", "Social Media", "Events", "Growth"],
    social: {
      twitter: "https://twitter.com/emmawong",
      linkedin: "https://linkedin.com/in/emmawong",
    }
  },
  {
    name: "Карлос Мендес",
    role: "Tokenomics Specialist",
    bio: "Бывший экономист с опытом в моделировании инфляции и торговли. ПроектируетTokenomics Chihuahua Capital для устойчивого роста.",
    avatar: "https://avatars.dicebear.com/api/micah/carlos.svg",
    skills: ["Economic Modeling", "Market Analysis", "Game Theory", "Staking Mechanisms"],
    social: {
      twitter: "https://twitter.com/carlosmendes",
      linkedin: "https://linkedin.com/in/carlosmendes",
    }
  },
  {
    name: "Лиза Джонсон",
    role: "UI/UX Designer",
    bio: "Дизайнер с опытом работы в финтех-компаниях. Создаёт интуитивные интерфейсы, чтобы сделать DeFi доступным для всех.",
    avatar: "https://avatars.dicebear.com/api/micah/lisa.svg",
    skills: ["UI Design", "UX Research", "Figma", "Web Animation"],
    social: {
      linkedin: "https://linkedin.com/in/lisajohnson",
      website: "https://lisajohnson.design",
    }
  }
];

// Категории команды для фильтрации
const categories = [
  "All",
  "Leadership",
  "Engineering",
  "Research",
  "Community"
];

// Мапинг ролей к категориям
const roleToCategory: Record<string, string> = {
  "CEO & Founder": "Leadership",
  "CTO": "Leadership",
  "Lead Developer": "Engineering",
  "Smart Contract Engineer": "Engineering",
  "Head of Research": "Research",
  "Tokenomics Specialist": "Research",
  "Community Manager": "Community",
  "UI/UX Designer": "Engineering"
};

const TeamGrid = () => {
  const theme = useTheme();
  const [category, setCategory] = useState("All");
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(teamMembers);

  useEffect(() => {
    if (category === "All") {
      setFilteredMembers(teamMembers);
    } else {
      setFilteredMembers(
        teamMembers.filter(member => roleToCategory[member.role] === category)
      );
    }
  }, [category]);

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Наша Команда
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}
        >
          Познакомьтесь с экспертами, создающими будущее DeFi с Chihuahua Capital
        </Typography>

        <Tabs
          value={category}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }
          }}
          sx={{
            mb: 5,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              minWidth: 'auto',
              px: 3,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'text.primary',
                fontWeight: 'bold',
              },
            },
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} value={cat} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ position: 'relative', minHeight: '500px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Grid container spacing={4}>
              {filteredMembers.map((member, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3} 
                  key={member.name}
                  component={motion.div}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <TeamMemberCard member={member} />
                </Grid>
              ))}
            </Grid>

            {filteredMembers.length === 0 && (
              <Box 
                sx={{ 
                  textAlign: 'center',
                  py: 8,
                  background: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Нет членов команды в этой категории
                </Typography>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default TeamGrid; 