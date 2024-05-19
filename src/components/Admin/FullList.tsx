import React, { useState, useEffect } from 'react';
import {
  Box, Button, Heading, List, ListItem, IconButton, Collapse, useToast
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon, ChevronDownIcon, ChevronUpIcon, AddIcon } from '@chakra-ui/icons';
import { Entity, Category } from '../../services/object-service';

interface GenericListProps {
  items: Entity[];
  onAddCategory: () => void;
  onAddRule: (categoryId: number) => void;
  onAddItem: (categoryId: number) => void;
  onEditCategory: (categoryId: number) => void;
  onEditRule: (ruleId: number) => void;
  onEditItem: (itemId: number) => void;
  onDeleteCategory: (categoryId: number) => void;
  onDeleteRule: (ruleId: number) => void;
  onDeleteItem: (itemId: number) => void;
  onViewCategory: (categoryId: number) => void;
  onViewRule: (ruleId: number) => void;
  onViewItem: (itemId: number) => void;
  title: string;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

const FullList: React.FC<GenericListProps> = ({
  items,
  onAddCategory,
  onAddRule,
  onAddItem,
  onEditCategory,
  onEditRule,
  onEditItem,
  onDeleteCategory,
  onDeleteRule,
  onDeleteItem,
  onViewCategory,
  onViewRule,
  onViewItem,
  title,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const toast = useToast();

  const toggleSubList = (id: number, isCategory: boolean) => {
    const updatedOpenIds = new Set(openIds);
    if (updatedOpenIds.has(id)) {
      updatedOpenIds.delete(id);
      if (isCategory) {
        console.log("Updating selectedCategory in toggleSubList:", undefined);
        setSelectedCategory(null);
      }
    } else {
      updatedOpenIds.add(id);
      if (isCategory) {
        const selected = items.find((category) => category.id === id) as Category;
        console.log("Updating selectedCategory in toggleSubList:", selected);
        setSelectedCategory(selected);
      }
    }
    setOpenIds(updatedOpenIds);
  };

  useEffect(() => {
    console.log("Selected category updated:", selectedCategory);
  }, [selectedCategory]);

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">{title}</Heading>
        <Button leftIcon={<AddIcon />} onClick={onAddCategory}>Legg til Kategori</Button>
      </Box>
      <List spacing={3}>
        {items.map((category) => (
          <React.Fragment key={category.id}>
            <ListItem display="flex" justifyContent="space-between" alignItems="center">
              <Box flex="1" onClick={() => {
                onViewCategory(category.id);
                setSelectedCategory(category as Category);
              }}>
                {category.name}
              </Box>
              <Box>
                <IconButton
                  aria-label="Expand Sublist"
                  icon={openIds.has(category.id) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubList(category.id, true);
                  }}
                />
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCategory(category.id);
                    setSelectedCategory(category as Category);
                  }}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory(category.id);
                    setSelectedCategory(category as Category);
                  }}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                    setSelectedCategory(null);
                  }}
                />
              </Box>
            </ListItem>
            {openIds.has(category.id) && (
              <Collapse in={openIds.has(category.id)} animateOpacity>
                <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" mt={4}>
                  <Heading size="sm" display="flex" alignItems="center">
                    Rules for {category.name}
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={openIds.has(category.id + 1000) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubList(category.id + 1000, false);
                      }}
                      aria-label="Expand Rules"
                    />
                    <Button
                      ml={2}
                      leftIcon={<AddIcon />}
                      size="sm"
                      onClick={() => onAddRule(category.id)}
                    >
                      Legg til Regel
                    </Button>
                  </Heading>
                  <Collapse in={openIds.has(category.id + 1000)} animateOpacity>
                    <List spacing={3} mt={3}>
                      {category.subItems.filter(item => item.type === 'rule').map((rule) => (
                        <ListItem key={rule.id} display="flex" justifyContent="space-between" alignItems="center">
                          <Box flex="1" onClick={() => onViewRule(rule.id)}>
                            {rule.name}
                          </Box>
                          <Box>
                            <IconButton
                              aria-label="View"
                              icon={<ViewIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewRule(rule.id);
                              }}
                            />
                            <IconButton
                              aria-label="Edit"
                              icon={<EditIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditRule(rule.id);
                              }}
                            />
                            <IconButton
                              aria-label="Delete"
                              icon={<DeleteIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteRule(rule.id);
                              }}
                            />
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
                <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" mt={4}>
                  <Heading size="sm" display="flex" alignItems="center">
                    Items for {category.name}
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={openIds.has(category.id + 2000) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubList(category.id + 2000, false);
                      }}
                      aria-label="Expand Items"
                    />
                    <Button
                      ml={2}
                      leftIcon={<AddIcon />}
                      size="sm"
                      onClick={() => onAddItem(category.id)}
                    >
                      Legg til Gjenstand
                    </Button>
                  </Heading>
                  <Collapse in={openIds.has(category.id + 2000)} animateOpacity>
                    <List spacing={3} mt={3}>
                      {category.subItems.filter(item => item.type === 'item').map((item) => (
                        <ListItem key={item.id} display="flex" justifyContent="space-between" alignItems="center">
                          <Box flex="1" onClick={() => onViewItem(item.id)}>
                            {item.name}
                          </Box>
                          <Box>
                            <IconButton
                              aria-label="View"
                              icon={<ViewIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewItem(item.id);
                              }}
                            />
                            <IconButton
                              aria-label="Edit"
                              icon={<EditIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditItem(item.id);
                              }}
                            />
                            <IconButton
                              aria-label="Delete"
                              icon={<DeleteIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteItem(item.id);
                              }}
                            />
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default FullList;
