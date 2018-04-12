package com.example.rasmus.teamfinder;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<Player> implements View.OnClickListener{

    private ArrayList<Player> dataSet;
    Context mContext;

    // View lookup cache
    private static class ViewHolder {
        TextView matchedPlayerName;
        TextView matchedPlayerRank;
        TextView matchedPlayerPosition;
        ImageView matchedPlayerImage;
    }

    public CustomAdapter(ArrayList<Player> data, Context context) {
        super(context, R.layout.row_item, data);
        this.dataSet = data;
        this.mContext=context;

    }

    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();

        Intent selectedMatchIntent = new Intent(mContext, SelectedMatchActivity.class);
        selectedMatchIntent.putExtra("PLAYER_INDEX", position);
        mContext.startActivity(selectedMatchIntent);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Player Player = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        ViewHolder viewHolder; // view lookup cache stored in tag


        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.row_item, parent, false);
            viewHolder.matchedPlayerName = convertView.findViewById(R.id.matchedPlayerName);
            viewHolder.matchedPlayerRank = convertView.findViewById(R.id.matchedPlayerRank);
            viewHolder.matchedPlayerPosition = convertView.findViewById(R.id.matchedPlayerPosition);
            viewHolder.matchedPlayerImage = convertView.findViewById(R.id.matchedPlayerImage);

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.matchedPlayerName.setText(Player.getName());
        viewHolder.matchedPlayerRank.setText(String.format(mContext.getResources().getString(R.string.rank_placeholder), Player.getRank()));
        viewHolder.matchedPlayerPosition.setText(Player.getPosition());
        viewHolder.matchedPlayerImage.setImageBitmap(
                decodeSampledBitmapFromResource(mContext.getResources(), Player.getImageRes(), 50, 50));
        // Return the completed view to render on screen
        return convertView;
    }

    public static int calculateInSampleSize(
            BitmapFactory.Options options, int reqWidth, int reqHeight) {
        // Raw height and width of image
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;

        if (height > reqHeight || width > reqWidth) {

            final int halfHeight = height / 2;
            final int halfWidth = width / 2;

            // Calculate the largest inSampleSize value that is a power of 2 and keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) >= reqHeight
                    && (halfWidth / inSampleSize) >= reqWidth) {
                inSampleSize *= 2;
            }
        }

        return inSampleSize;
    }

    public static Bitmap decodeSampledBitmapFromResource(Resources res, int resId,
                                                         int reqWidth, int reqHeight) {

        // First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeResource(res, resId, options);

        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);

        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeResource(res, resId, options);
    }
}