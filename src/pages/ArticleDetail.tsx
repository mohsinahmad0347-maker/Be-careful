import { useParams, useNavigate } from 'react-router-dom'
import { Clock, User, ArrowLeft, BookOpen, Calendar, Tag } from 'lucide-react'
import { articles } from '../data/demo'
import Badge from '../components/ui/Badge'

// Content for each article (fictional)
const articleContent: Record<string, { sections: Array<{ title: string; content: string }>; related: string[] }> = {
  art1: {
    sections: [
      {
        title: 'Introduction',
        content: 'Heart disease remains one of the leading causes of death worldwide. However, most cardiovascular diseases are preventable through lifestyle modifications and early intervention.',
      },
      {
        title: '1. Stay Physically Active',
        content: 'Aim for at least 150 minutes of moderate-intensity aerobic exercise per week. Activities like brisk walking, swimming, cycling, and dancing can significantly reduce blood pressure, improve cholesterol levels, and strengthen your heart muscle.',
      },
      {
        title: '2. Eat a Heart-Healthy Diet',
        content: 'Focus on whole foods: fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit saturated fats, trans fats, added sugars, and excessive salt. The Mediterranean diet is particularly beneficial for heart health.',
      },
      {
        title: '3. Manage Your Weight',
        content: 'Excess body weight increases the risk of high blood pressure, diabetes, and high cholesterol. Even modest weight loss can dramatically reduce cardiovascular risk factors.',
      },
      {
        title: '4. Quit Smoking',
        content: 'Smoking is one of the strongest risk factors for heart disease. Quitting smoking immediately begins to improve circulation and lung function, and within a year, your heart disease risk is cut in half.',
      },
      {
        title: '5. Limit Alcohol',
        content: 'Moderate alcohol consumption may have some heart benefits, but excessive drinking increases blood pressure, contributes to weight gain, and can lead to heart failure.',
      },
    ],
    related: ['art4', 'art5'],
  },
  art2: {
    sections: [
      {
        title: 'Understanding Blood Glucose',
        content: 'Blood sugar levels fluctuate throughout the day in response to food, activity, stress, and medication. Learning to monitor and manage these levels is key to living well with diabetes.',
      },
      {
        title: 'Monitoring Techniques',
        content: 'Regular monitoring helps you understand how your body responds to different foods, activities, and medications. Consider using a continuous glucose monitor for real-time insights.',
      },
      {
        title: 'Nutrition and Meal Planning',
        content: 'Carbohydrate counting, portion control, and balanced meals are essential for maintaining stable blood sugar levels throughout the day.',
      },
    ],
    related: ['art4', 'art6'],
  },
  art3: {
    sections: [
      {
        title: 'The Exercise-Mood Connection',
        content: 'Physical activity stimulates the release of endorphins, serotonin, and dopamine—neurochemicals that improve mood and reduce feelings of anxiety and depression.',
      },
      {
        title: 'Types of Exercise for Mental Health',
        content: 'Aerobic exercise, strength training, yoga, and even simple walking have been shown to significantly reduce symptoms of depression and anxiety.',
      },
    ],
    related: ['art5', 'art4'],
  },
  art4: {
    sections: [
      {
        title: 'Macronutrients: The Building Blocks',
        content: 'Proteins, carbohydrates, and fats each play unique roles in maintaining health. Understanding their functions helps in creating balanced meals.',
      },
      {
        title: 'Micronutrients and Vitamins',
        content: 'Essential vitamins and minerals support everything from immune function to energy production and bone health.',
      },
    ],
    related: ['art1', 'art2'],
  },
  art5: {
    sections: [
      {
        title: 'Identifying Stress Triggers',
        content: 'Learning to recognize what triggers your stress response is the first step in developing effective coping strategies.',
      },
      {
        title: 'Mindfulness and Relaxation Techniques',
        content: 'Deep breathing, meditation, progressive muscle relaxation, and yoga can help activate the body\'s relaxation response.',
      },
    ],
    related: ['art3', 'art1'],
  },
  art6: {
    sections: [
      {
        title: 'Developmental Milestones',
        content: 'Understanding typical development helps parents support their child\'s growth and identify potential concerns early.',
      },
      {
        title: 'When to Seek Help',
        content: 'Early intervention can make a significant difference in outcomes for developmental delays or health concerns.',
      },
    ],
    related: ['art3', 'art4'],
  },
}

const catColors: Record<string, 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple'> = {
  Prevention:          'green',
  Nutrition:           'orange',
  Fitness:             'blue',
  'General Health':    'blue',
  "Women's Health":    'purple',
  "Men's Health":      'blue',
  "Children's Health": 'green',
  'Mental Wellness':   'purple',
  'Medical Education': 'gray',
}

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find(a => a.id === id)
  const content = article ? articleContent[article.id] : null

  if (!article || !content) {
    return (
      <div className="card text-center py-20">
        <BookOpen size={48} className="text-slate-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/articles')} className="btn-primary">
          Back to Articles
        </button>
      </div>
    )
  }

  const relatedArticles = content.related
    .map(rid => articles.find(a => a.id === rid))
    .filter((a): a is NonNullable<typeof a> => a != null)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button onClick={() => navigate('/articles')} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1.5">
        <ArrowLeft size={14} /> Back to Articles
      </button>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={catColors[article.category] ?? 'gray'}>{article.category}</Badge>
          <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
          <span className="text-sm text-slate-500 flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
          <span className="text-sm text-slate-500 flex items-center gap-1"><User size={12} /> {article.author}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{article.title}</h1>
        <p className="text-lg text-slate-600">{article.excerpt}</p>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="card space-y-8">
        {content.sections.map((sec, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">{sec.title}</h2>
            <p className="text-slate-700 leading-relaxed text-sm">{sec.content}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
        <p className="text-xs text-amber-800 text-center">
          <strong>Disclaimer:</strong> This article is for educational purposes only. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health concerns.
        </p>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map(ra => (
              <button key={ra.id} onClick={() => navigate(`/articles/${ra.id}`)}
                className="card-hover text-left p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={catColors[ra.category] ?? 'gray'}>{ra.category}</Badge>
                  <span className="text-xs text-slate-400">{ra.readTime}</span>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">{ra.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{ra.excerpt}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center pt-4 border-t border-slate-100">
        <button onClick={() => navigate('/articles')} className="btn-primary">
          Browse All Articles
        </button>
      </div>
    </div>
  )
}