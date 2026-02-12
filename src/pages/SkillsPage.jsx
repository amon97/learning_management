import RadarChart from '../components/Skills/RadarChart';
import './SkillsPage.css';

export default function SkillsPage({ skills, setSkills, categories }) {
    const handleSkillChange = (categoryId, level) => {
        setSkills(
            skills.map((s) =>
                s.categoryId === categoryId ? { ...s, level } : s
            )
        );
    };

    return (
        <div className="skills-page">
            <h1 className="page-title gradient-text">スキルマップ</h1>
            <p className="page-subtitle">自分のスキルレベルを可視化しましょう</p>

            <div className="skills-page-content">
                <RadarChart
                    skills={skills}
                    categories={categories}
                    onSkillChange={handleSkillChange}
                />
            </div>
        </div>
    );
}
