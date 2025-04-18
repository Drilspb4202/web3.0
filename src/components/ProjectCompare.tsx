import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  Avatar, 
  Chip, 
  IconButton, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectCompareProps {
  projects: Project[];
  selectedProjects: number[];
  onRemoveProject: (id: number) => void;
  onClearAll: () => void;
}

const ProjectCompare: React.FC<ProjectCompareProps> = ({ 
  projects, 
  selectedProjects, 
  onRemoveProject, 
  onClearAll 
}) => {
  const [open, setOpen] = useState(false);
  const [compareProjects, setCompareProjects] = useState<Project[]>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const filtered = projects.filter(project => selectedProjects.includes(project.id));
    setCompareProjects(filtered);
  }, [projects, selectedProjects]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'var(--warning-color)';
    if (progress < 70) return 'var(--info-color)';
    return 'var(--success-color)';
  };

  if (selectedProjects.length === 0) {
    return null;
  }

  return (
    <>
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          zIndex: 1000, 
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            background: 'var(--gradient-primary)', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Сравнение проектов ({selectedProjects.length})
          </Typography>
          <Box>
            <IconButton 
              size="small" 
              color="inherit" 
              onClick={onClearAll}
              sx={{ mr: 1 }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton 
              size="small" 
              color="inherit" 
              onClick={handleOpen}
              disabled={selectedProjects.length < 2}
            >
              <CompareArrowsIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 2, maxWidth: 300, bgcolor: 'background.paper' }}>
          <Grid container spacing={1}>
            {compareProjects.map(project => (
              <Grid item xs={12} key={project.id}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    p: 1,
                    borderRadius: 'var(--radius-md)',
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <Avatar 
                      src={project.logo} 
                      alt={project.name} 
                      sx={{ width: 32, height: 32, mr: 1 }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 180
                      }}
                    >
                      {project.name}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => onRemoveProject(project.id)}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          {selectedProjects.length < 2 ? (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Добавьте ещё минимум {2 - selectedProjects.length} проект для сравнения
              </Typography>
            </Box>
          ) : (
            <Button 
              fullWidth 
              variant="contained" 
              sx={{ 
                mt: 2,
                textTransform: 'none',
                background: 'var(--gradient-primary)'
              }}
              onClick={handleOpen}
            >
              Сравнить проекты
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          elevation: 3,
          sx: { 
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'var(--gradient-primary)', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CompareArrowsIcon sx={{ mr: 1 }} />
            Сравнение проектов
          </Box>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      bgcolor: alpha(theme.palette.primary.main, 0.1) 
                    }}
                  >
                    Характеристика
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell 
                      key={project.id}
                      align="center"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {project.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Категория */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Категория
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell key={project.id} align="center">
                      <Chip 
                        label={project.category} 
                        size="small" 
                        sx={{ fontWeight: 'medium' }} 
                      />
                    </TableCell>
                  ))}
                </TableRow>

                {/* Собрано средств */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Собрано средств
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell key={project.id} align="center">
                      {project.raised 
                        ? `${project.raised.toLocaleString()} ₽` 
                        : 'Нет данных'}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Цель сбора */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Цель сбора
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell key={project.id} align="center">
                      {project.goal 
                        ? `${project.goal.toLocaleString()} ₽` 
                        : 'Нет данных'}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Прогресс */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Прогресс
                  </TableCell>
                  {compareProjects.map(project => {
                    const progress = project.raised && project.goal 
                      ? Math.round((project.raised / project.goal) * 100)
                      : 0;
                    
                    return (
                      <TableCell key={project.id} align="center">
                        {project.raised && project.goal ? (
                          <Box sx={{ maxWidth: 160, mx: 'auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight="bold">
                                {progress}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={progress} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                bgcolor: 'rgba(0,0,0,0.05)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getProgressColor(progress)
                                }
                              }} 
                            />
                          </Box>
                        ) : (
                          'Нет данных'
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Цена токена */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Цена токена
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell key={project.id} align="center">
                      {project.tokenPrice && project.currency 
                        ? `${project.tokenPrice} ${project.currency}` 
                        : 'Нет данных'}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Статус */}
                <TableRow>
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    Статус
                  </TableCell>
                  {compareProjects.map(project => (
                    <TableCell key={project.id} align="center">
                      {project.status || (project.raised && project.goal ? 'Активен' : 'Не определен')}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClearAll} color="error" startIcon={<DeleteIcon />}>
            Очистить список
          </Button>
          <Button onClick={handleClose} variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectCompare; 