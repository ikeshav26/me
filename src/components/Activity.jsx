import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import NowPlaying from './NowPlaying'
import Discord from '../modals/Discord.jsx'
import Song from '../modals/Song.jsx'

const Activity = () => {
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [lastCommit, setLastCommit] = useState(null)
  const [showDiscord, setShowDiscord] = useState(false)
  const [showSong, setShowSong] = useState(false)

  useEffect(() => {
    
    const updateTime = () => {
      const now = new Date()
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const hours = istTime.getHours().toString().padStart(2, '0')
      const minutes = istTime.getMinutes().toString().padStart(2, '0')
      const seconds = istTime.getSeconds().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    
    const fetchGitHubData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GITSTATUS_URL)
        const data = response.data
        if (data && data.length > 0) {
          setLastCommit({
            message: data[0].commit.message,
            date: new Date(data[0].commit.author.date).toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            sha: data[0].sha.substring(0, 7)
          })
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      }
    }

    fetchGitHubData()

    const fetchActivity = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_STATUS_URL)
        const data = response.data
        
        if (data.success) {
          const userData = data.data
          
          const otherActivities = userData.activities?.filter(
            act => act.type !== 2 
          )
          
          setActivity({
            status: userData.discord_status,
            activities: otherActivities || [],
            customStatus: userData.activities?.find(act => act.type === 4)
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching activity:', error)
        setLoading(false)
      }
    }

    fetchActivity()
    const interval = setInterval(fetchActivity, 10000) 

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  useGSAP(() => {
    if (!loading) {
      gsap.from('.activity-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }
  }, [loading])

  if (loading) {
    return (
      <div className='w-full py-8'>
        <div className='animate-pulse'>
          <div className='h-4 bg-[#c8c8c8]/20 rounded w-32 mb-4'></div>
          <div className='h-20 bg-[#c8c8c8]/20 rounded'></div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#00f050'
      case 'idle': return '#ffa500'
      case 'dnd': return '#ff0000'
      default: return '#808080'
    }
  }

  const getActivityIcon = (name) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('visual studio code') || lowerName.includes('vscode')) {
      return '💻'
    }
    if (lowerName.includes('spotify')) {
      return '🎵'
    }
    if (lowerName.includes('youtube')) {
      return '📺'
    }
    return '🎮'
  }

  return (
    <>
      <div 
        className='w-full flex flex-col space-y-3 cursor-pointer hover:opacity-80 transition-opacity'
        onClick={() => setShowDiscord(true)}
      >
        {activity?.status && (
          <div className='activity-card flex items-center justify-between border-b border-[#c8c8c8]/10 pb-3'>
            <div className='flex items-center gap-2'>
              <div 
                className='w-2 h-2 rounded-full animate-pulse'
                style={{ backgroundColor: getStatusColor(activity.status) }}
              ></div>
              <span className='text-[#c8c8c8]/60 text-xs font-[font2]'>
                {activity.status === 'online' ? 'Online' : 
                 activity.status === 'idle' ? 'Away' : 
                 activity.status === 'dnd' ? 'DND' : 'Offline'}
              </span>
            </div>
          </div>
        )}


      {activity?.customStatus && (
        <div className='activity-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3'>
          {activity.customStatus.emoji && (
            <span className='text-lg'>{activity.customStatus.emoji.name}</span>
          )}
          <span className='text-[#c8c8c8] text-sm truncate'>
            {activity.customStatus.state}
          </span>
        </div>
      )}


      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='activity-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3 min-h-[60px]'>
          <div className='text-lg'>🕐</div>
          <div className='flex-1 min-w-0'>
            <div className='text-[#c8c8c8]/60 text-xs font-[font2]'>IST</div>
            <div className='text-white text-sm font-[font1] tabular-nums'>
              {currentTime}
            </div>
          </div>
        </div>


        <div className='activity-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3 min-h-[60px]'>
          <div className='text-lg'>📝</div>
          <div className='flex-1 min-w-0'>
            <div className='text-[#c8c8c8]/60 text-xs font-[font2]'>Last Commit</div>
            {lastCommit ? (
              <>
                <div className='text-white text-sm font-[font1] truncate'>
                  {lastCommit.message}
                </div>
                <div className='text-[#00f050] text-xs'>
                  {lastCommit.sha}
                </div>
              </>
            ) : (
              <div className='text-[#c8c8c8]/40 text-xs'>
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {activity?.activities && activity.activities.length > 0 ? (
          <div className='activity-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3 min-h-[60px]'>
            <div className='text-lg'>{getActivityIcon(activity.activities[0].name)}</div>
            <div className='flex-1 min-w-0'>
              <div className='text-[#c8c8c8]/60 text-xs font-[font2]'>
                {activity.activities[0].type === 0 ? 'Playing' : activity.activities[0].type === 1 ? 'Streaming' : 'Using'}
              </div>
              <div className='text-white text-sm font-[font1] truncate'>
                {activity.activities[0].name}
              </div>
              {activity.activities[0].details && (
                <div className='text-[#c8c8c8]/60 text-xs truncate'>
                  {activity.activities[0].details}
                </div>
              )}
            </div>
            {activity.activities[0].assets?.large_image && (
              <img 
                src={
                  activity.activities[0].assets.large_image.startsWith('mp:')
                    ? activity.activities[0].assets.large_image.replace('mp:', 'https://media.discordapp.net/')
                    : `https://cdn.discordapp.com/app-assets/${activity.activities[0].application_id}/${activity.activities[0].assets.large_image}.png`
                }
                alt={`${activity.activities[0].name} logo`}
                loading="lazy"
                width="32"
                height="32"
                className='w-8 h-8 rounded shrink-0'
              />
            )}
          </div>
        ) : (
          <div className='activity-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3 min-h-[60px]'>
            <div className='text-lg'>💻</div>
            <div className='flex-1 min-w-0'>
              <div className='text-[#c8c8c8]/60 text-xs font-[font2]'>VS Code</div>
              <div className='text-[#c8c8c8]/40 text-sm'>
                Not active
              </div>
            </div>
          </div>
        )}

        <div 
          className='music-card flex items-center gap-2 border-b border-[#c8c8c8]/10 pb-3 min-h-[60px] cursor-pointer hover:opacity-80 transition-opacity'
          onClick={(e) => {
            e.stopPropagation()
            setShowSong(true)
          }}
        >
          <NowPlaying />
        </div>
      </div>
    </div>

      {showDiscord && <Discord onClose={() => setShowDiscord(false)} />}
      {showSong && <Song onClose={() => setShowSong(false)} />}
    </>
  )
}

export default Activity
