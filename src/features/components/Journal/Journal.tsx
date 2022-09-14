import { FC, useState, useEffect } from "react";
import { journalStory, getPic, getPicForRelated } from "../../API";
import { TStory } from "../../Types";
import Footer from "../Footer/Footer";
import Header from "../header/header";
import Spinner from "../spinner/spinner";
import { useSelector } from 'react-redux';
import { rootReducer } from "../../../app/store";
import styles from './journal.module.css'


const Journal: FC = () => {

    const [story, setStory] = useState<TStory[] | undefined>();
    const [storiesList, setStoriesList] = useState<TStory[] | undefined>();
    const [loadingStory, setLoadingStory] = useState<Boolean>();
    const [loadingStories, setLoadingStories] = useState<Boolean>();
    const [relatedStories, setRelatedStories] = useState<TStory[] | undefined>();

    type IRootState = ReturnType<typeof rootReducer>
    const list: TStory[] = useSelector((state: IRootState) => state.storylist.stories);
 
    useEffect(() => {
        journalStory(setLoadingStory).then((story) => setStory(story)); 
        setStoriesList(list);
    }, []);

    useEffect(() => {
        createRelatedStories(storiesList)  
    }, [storiesList])

    const showNext = async (id: string, url:string = '') => {
        if(storiesList){
            const next: TStory[] = storiesList.filter((item: TStory) => item._id === id)

            if(url === ''){
                let nextStory = getPic(next)
                console.log(nextStory)
                setStory(await nextStory)
            };
            if(url !== ''){
                let newData: any = {url : ''};              
                newData.url = url;
                next.push(newData);
                setStory(next)   
            }
        }
    };

    const createStory = (story: TStory[] | undefined) => {
        if (story){
            return (
                <div className={styles.container}>
                    <h1 className={styles.title}>{story[0].title}</h1>
                    <img className={styles.image} alt={story[0].title} src={story[1].url}/>
                    <div className={styles.story}>{story[0].story}</div>
                    <div className={styles.moral}>"{story[0].moral}"</div>
                </div>
            )
        }
    };

    const createRelatedStories = async (stories: TStory[] |undefined) => {
        if (stories){

            let list: TStory[] = [];
            let picsList: string[] = [];
            
             for(let i=0; i< 4; i++){ 
                let randomNum:number = Math.floor(Math.random() * 99);
                list.push(stories[randomNum]);
                await getPicForRelated(picsList)
            };
       
            let newData = list.map((item, i) => 
                    Object.assign({}, item, {url: picsList[i]})
            );

            setRelatedStories(newData);        
        }
    };

    const showRelated = (relatedStories: TStory[] | undefined) => {
      
            if(relatedStories){

                return  relatedStories.map((item: TStory) => {
                    return (
                        <div className={styles.relatedStory} key={item._id} onClick={() => showNext(item._id ? item._id : "", item.url)}>
                            <img alt={item.title} src={item.url}/>
                            <h1>{item.title}</h1>
                            <div>{item.moral}</div>
                        </div>               
                    );
                });
            };
    };

    const nextStory = (stories: TStory[] | undefined) => {
        if(stories) {
            let randomNum:number = Math.floor(Math.random() * 99);

            const {_id, title } = stories[randomNum];
          
            return (
                <div className={styles.nextContainer}>
                    <p className={styles.next}> Next Story</p>
                    <div id={_id} onClick={() => showNext(_id? _id : "")}>
                        <div>
                            <span className={styles.nextTitle}>{title}</span> 
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        <>
            <Header/>
            {
                loadingStory ? <Spinner/> : createStory(story)
            }
            {
                loadingStories ? <Spinner/> : nextStory(storiesList)
            }
            <div className={styles.relatedContainer}>
                <h2  className={styles.relatedtitle}> Related stories</h2>
                <div className={styles.storiesContainer}>
                    {
                        relatedStories ? showRelated(relatedStories) : <Spinner/>
                    }   
                </div> 
            </div>    
            <Footer/>
        </>
    );
}

export default Journal;