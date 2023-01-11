import { classNames } from 'shared/lib/classNames/classNames';
import bgOne from '../../../shared/assets/nurse.jpg';
import bgTwo from '../../../shared/assets/mechanical.jpg';
import bgThree from '../../../shared/assets/business.jpg';
import cls from './Home.module.scss';

interface HomeProps {
    className?: string;
}

export function Home({ className }: HomeProps) {
  return (
    <div className={classNames(cls.Home, {}, [className])}>
      <div className={cls.home_new}>
        <h2>What&apos;s New?</h2>
        <ul>
          <li className={cls.new_item}>
            <p>CUNY added &quot;Nursing Chemistry Resources&quot; collection</p>
            <img src={bgOne} alt="bgOne" width="240px" height="160px" />
          </li>
          <li className={cls.new_item}>
            <p>CUNY added &quot;Mechanical Engineering&quot; collection</p>
            <img src={bgTwo} alt="bgTwo" width="240px" height="160px" />
          </li>
          <li className={cls.new_item}>
            <p>LOUIS added &quot;Cost Accounting collection</p>
            <img src={bgThree} alt="bgThree" width="240px" height="160px" />
          </li>
        </ul>
      </div>
      <div className={cls.home_activity}>
        <h2>Network Activity</h2>
        <ul className={cls.activity_list}>
          <li className={cls.activity_item}>
            <p>INFOhio added a collection to their library</p>
            <p>1 day ago</p>
          </li>
          <li className={cls.activity_item}>
            <p>CUNY uploaded 2 NEW collections</p>
            <p>3 days ago</p>
          </li>
          <li className={cls.activity_item}>
            <p>LOUIS updated 2 collections</p>
            <p>1 week ago</p>
          </li>
          <li className={cls.activity_item}>
            <p>CUNY subscribed to 1 of your collections</p>
            <p>4 weeks ago</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
