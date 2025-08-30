"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Dumbbell, Brain, Apple, Smartphone } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  completed: boolean
  type: "reference" | "oneshot"
  youtubeUrl?: string
  sectionHeader?: string
}

interface ResourceCategory {
  id: string
  title: string
  icon: React.ReactNode
  items: ChecklistItem[]
}

export function EducationalResources() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  // Load checked items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("educationalResources")
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading educational resources from localStorage:", error)
      }
    }
  }, [])

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    localStorage.setItem("educationalResources", JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const toggleCheckItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const categories: ResourceCategory[] = [
    {
      id: "fitness",
      title: "Fitness",
      icon: <Dumbbell className="h-5 w-5" />,
      items: [
        {
          id: "rutinas-header",
          title: "Recommended exercise routines:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "calistenia-1",
          title: "Full body at the park: 3x10 pull-ups + 3x15 dips + 3x20 squats",
          completed: false,
          type: "reference",
        },
        {
          id: "calistenia-2",
          title: "Home routine without equipment: 4x20 push-ups + 4x20 sit-ups + 3x20 squats",
          completed: false,
          type: "reference",
        },
        {
          id: "calistenia-3",
          title: 'Explosive cardio: 10 rounds of 30" burpees + 30" rest',
          completed: false,
          type: "reference",
        },
        {
          id: "calistenia-4",
          title: "Sun exposure: 30 min daily outdoor walk",
          completed: false,
          type: "reference",
        },
        {
          id: "calistenia-5",
          title: "Quick 10 min routine: 3 rounds of 10 squats + 10 push-ups + 10 sit-ups",
          completed: false,
          type: "reference",
        },

        {
          id: "beneficios-header",
          title: "Benefits of doing sports in your life:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        { id: "deporte-1", title: "Promotes discipline and commitment", completed: false, type: "reference" },
        { id: "deporte-2", title: "Strengthens collaboration and empathy", completed: false, type: "reference" },
        { id: "deporte-3", title: "Reduces stress and anxiety", completed: false, type: "reference" },
        { id: "deporte-4", title: "Builds a sense of belonging and community", completed: false, type: "reference" },
        {
          id: "deporte-5",
          title: "Improves cardiovascular health and strengthens the immune system",
          completed: false,
          type: "reference",
        },
        { id: "deporte-6", title: "Boosts self-esteem and personal confidence", completed: false, type: "reference" },
      ],
    },
    {
      id: "mente",
      title: "Mind",
      icon: <Brain className="h-5 w-5" />,
      items: [
        {
          id: "libros-header",
          title: "Recommended books:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        { id: "libro-1", title: "Atomic Habits – James Clear", completed: false, type: "oneshot" },
        { id: "libro-2", title: "The Power of Now – Eckhart Tolle", completed: false, type: "oneshot" },
        { id: "libro-3", title: "Man's Search for Meaning – Viktor Frankl", completed: false, type: "oneshot" },
        { id: "libro-4", title: "Deep Work – Cal Newport", completed: false, type: "oneshot" },
        { id: "libro-5", title: "Meditations – Marcus Aurelius", completed: false, type: "oneshot" },
        {
          id: "libro-6",
          title: "The 7 Habits of Highly Effective People – Stephen Covey",
          completed: false,
          type: "oneshot",
        },
        { id: "libro-7", title: "Mindset – Carol Dweck", completed: false, type: "oneshot" },
        { id: "libro-8", title: "Can't Hurt Me – David Goggins", completed: false, type: "oneshot" },
        { id: "libro-9", title: "The Obstacle is the Way – Ryan Holiday", completed: false, type: "oneshot" },
        { id: "libro-10", title: "Essentialism – Greg McKeown", completed: false, type: "oneshot" },

        {
          id: "videos-header",
          title: "Recommended videos:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "video-1",
          title: "What is Dopamine Fasting? – Kurzgesagt",
          completed: false,
          type: "oneshot",
          youtubeUrl: "https://www.youtube.com/embed/kTXTPe3wahc",
        },
        {
          id: "video-3",
          title: "The Effects of Alcohol and Drugs on the Brain – TED-Ed",
          completed: false,
          type: "oneshot",
          youtubeUrl: "https://www.youtube.com/embed/7sxpKhIbr0E",
        },
        {
          id: "video-4",
          title: "Porn Addiction and the Brain – Fight the New Drug",
          completed: false,
          type: "oneshot",
          youtubeUrl: "https://www.youtube.com/embed/1Ya67aLaaCc",
        },

        {
          id: "apps-header",
          title: "Recommended apps:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "meditacion-1",
          title: "Headspace – Guided meditation for beginners",
          completed: false,
          type: "reference",
        },
        {
          id: "meditacion-2",
          title: "Calm – Relaxing sounds and sleep meditations",
          completed: false,
          type: "reference",
        },
        {
          id: "meditacion-3",
          title: "Insight Timer – Global meditation community",
          completed: false,
          type: "reference",
        },
        {
          id: "meditacion-4",
          title: "4-7-8 Technique: Inhale 4s, hold 7s, exhale 8s",
          completed: false,
          type: "reference",
        },
        {
          id: "meditacion-5",
          title: "Mindfulness meditation: 10 min daily focusing on breath",
          completed: false,
          type: "reference",
        },
        {
          id: "meditacion-6",
          title: "Body scan: progressive relaxation of each part of the body",
          completed: false,
          type: "reference",
        },
      ],
    },
    {
      id: "nutricion",
      title: "Nutrition",
      icon: <Apple className="h-5 w-5" />,
      items: [
        {
          id: "recetas-header",
          title: "Recommended recipes:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "receta-1",
          title: "Egg white omelette with spinach and fresh cheese",
          completed: false,
          type: "reference",
        },
        { id: "receta-2", title: "Grilled chicken with quinoa and broccoli", completed: false, type: "reference" },
        { id: "receta-3", title: "Chickpea salad with tuna and boiled egg", completed: false, type: "reference" },
        { id: "receta-4", title: "Greek yogurt with oats and berries", completed: false, type: "reference" },
        {
          id: "receta-5",
          title: "Protein shake: milk, banana, peanut butter",
          completed: false,
          type: "reference",
        },
        { id: "receta-6", title: "Homemade lentil burger with salad", completed: false, type: "reference" },
        { id: "receta-7", title: "Baked fish fillet with sweet potato", completed: false, type: "reference" },

        // Healthy snacks
        { id: "snack-1", title: "Nuts (almonds, walnuts)", completed: false, type: "reference" },
        { id: "snack-2", title: "Hummus with carrot sticks", completed: false, type: "reference" },
        { id: "snack-3", title: "Apple with peanut butter", completed: false, type: "reference" },

        {
          id: "beneficios-nutricion-header",
          title: "Benefits of good nutrition:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        { id: "beneficio-1", title: "Lower risk of obesity and diabetes", completed: false, type: "reference" },
        { id: "beneficio-2", title: "Stable energy throughout the day", completed: false, type: "reference" },
        { id: "beneficio-3", title: "Better sleep quality", completed: false, type: "reference" },
        { id: "beneficio-4", title: "Strengthens the immune system", completed: false, type: "reference" },
        { id: "beneficio-5", title: "Improves concentration and brain function", completed: false, type: "reference" },
      ],
    },
    {
      id: "salud-digital",
      title: "Digital Health",
      icon: <Smartphone className="h-5 w-5" />,
      items: [
        {
          id: "hashtags-header",
          title: "Hashtags to hide (not recommended):",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "hashtag-1",
          title: "Hide hashtags: #drink, #alcohol, #beer, #wine, #cocktail",
          completed: false,
          type: "oneshot",
        },
        {
          id: "hashtag-2",
          title: "Hide hashtags: #smoke, #cigarette, #weed, #cannabis, #marijuana",
          completed: false,
          type: "oneshot",
        },
        {
          id: "hashtag-3",
          title: "Hide hashtags: #porn, #sex, #nsfw, #adult, #xxx",
          completed: false,
          type: "oneshot",
        },

        {
          id: "algoritmo-header",
          title: "Train your algorithm:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "algoritmo-1",
          title: "Actively search for content aligned with your goals",
          completed: false,
          type: "oneshot",
        },
        {
          id: "algoritmo-2",
          title: "Interact only with posts that provide value",
          completed: false,
          type: "oneshot",
        },
        {
          id: "algoritmo-3",
          title: 'Mark "Not Interested" on content that drains your attention',
          completed: false,
          type: "oneshot",
        },

        {
          id: "modo-byn-header",
          title: "Set grayscale mode:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        {
          id: "byn-ios",
          title: "iOS: Settings → Accessibility → Display & Text Size → Color Filters → Grayscale",
          completed: false,
          type: "oneshot",
        },
        {
          id: "byn-android",
          title: "Android: Settings → Accessibility → Vision → Color Correction → Monochrome",
          completed: false,
          type: "oneshot",
        },

        {
          id: "beneficios-digital-header",
          title: "Benefits of digital health:",
          completed: false,
          type: "reference",
          sectionHeader: "header",
        },
        { id: "ventaja-1", title: "Your phone becomes less addictive", completed: false, type: "reference" },
        {
          id: "ventaja-2",
          title: "More time paying attention to real life instead of the screen",
          completed: false,
          type: "reference",
        },
        { id: "ventaja-3", title: "Better sleep quality by reducing blue light", completed: false, type: "reference" },
        {
          id: "ventaja-4",
          title: "Increased productivity and focus on important tasks",
          completed: false,
          type: "reference",
        },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📚 Educational Resources</h2>
        <p className="text-gray-400 text-sm">Tools for your personal growth</p>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-[#161B22] border-[#30363D] overflow-hidden">
            <CardHeader
              className="cursor-pointer hover:bg-[#21262D] transition-all duration-200 py-3 px-4 border-b border-[#30363D]/50"
              onClick={() => toggleSection(category.id)}
            >
              <CardTitle className="flex items-center justify-center text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span className="text-base font-medium">{category.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections.includes(category.id) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </motion.div>
                </div>
              </CardTitle>
            </CardHeader>

            <AnimatePresence>
              {expandedSections.includes(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="p-3 space-y-2">
                    {category.items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-start gap-2">
                          {item.type === "oneshot" ? (
                            <button
                              onClick={() => toggleCheckItem(item.id)}
                              className="mt-0.5 text-base hover:scale-110 transition-transform flex-shrink-0"
                            >
                              {checkedItems[item.id] ? "✅" : "☐"}
                            </button>
                          ) : (
                            <span className="mt-1 text-gray-500 flex-shrink-0">•</span>
                          )}
                          <span
                            className={`text-sm leading-relaxed ${
                              item.sectionHeader === "header"
                                ? "font-semibold text-white text-sm"
                                : checkedItems[item.id]
                                  ? "line-through opacity-60 text-gray-400"
                                  : "text-gray-300"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {/* YouTube embed for videos */}
                        {item.youtubeUrl && (
                          <div className="ml-5 mt-2">
                            <div className="aspect-video rounded-lg overflow-hidden bg-black">
                              <iframe
                                src={item.youtubeUrl}
                                title={item.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
