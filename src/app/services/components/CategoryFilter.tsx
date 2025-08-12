import { Box, Button } from '@mui/material';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        flexWrap: 'wrap',
        mb: 4,
      }}
    >
      {['All Services', ...categories].map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'contained' : 'outlined'}
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category ? 'y2k-button' : ''}
          sx={{
            borderColor: 'y2k.primary',
            color: selectedCategory === category ? 'white' : 'y2k.primary',
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryFilter;
