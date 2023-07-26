# frozen_string_literal: true

40.times do |n|
  Song.create!(
    name: "#{n + 1}の歌",
    artist: "the #{n + 1}s",
    duration_time: rand(210_000..300_000),
    transposition: rand(-7..7)
  )
end

Setlist.create!(
  [
    {
      title: 'セトリ 1',
      target_duration_time: 1_800_000
    },
    {
      title: 'セトリ 2',
      target_duration_time: 3_600_000
    },
    {
      title: 'セトリ 3',
      target_duration_time: 7_200_000
    }
  ]
)

setlists = Setlist.all

setlists.each do |setlist|
  songs_ids = Song.pluck(:id).sample(10)
  songs_ids.each_with_index do |song_id, i|
    SongSetlist.create!(song_id:, setlist_id: setlist.id, position: i)
  end
end
