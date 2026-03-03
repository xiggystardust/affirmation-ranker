import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AffirmationCard from './AffirmationCard'

function SortableItem({ affirmation, index, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        position: 'relative',
        mb: { xs: 2.5, sm: 2 },
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <AffirmationCard 
        affirmation={affirmation} 
        showRank={true}
        rankPosition={index + 1}
      />
    </Box>
  )
}

function RankingList({ affirmations, onReorder }) {
  const [items, setItems] = useState(affirmations)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        
        if (onReorder) {
          onReorder(newItems)
        }
        
        return newItems
      })
    }
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center', px: 1 }}>
        Drag to reorder (1 = most acceptable, 3 = least acceptable)
      </Typography>
      <Box sx={{ pl: { xs: 6, md: 7 } }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((affirmation, index) => (
              <SortableItem
                key={affirmation.id}
                id={affirmation.id}
                affirmation={affirmation}
                index={index}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  )
}

export default RankingList
